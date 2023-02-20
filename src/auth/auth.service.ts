import {
  ConflictException,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { User } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from './jwtPayload.interface';

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwtService: JwtService,
  ) {}

  async createUser(dto: AuthCredentialsDto): Promise<User> {
    const { username, password } = dto;
    let user: User;

    try {
      // hash password
      const hashedPassword = await bcrypt.hash(password, 10);
      user = await this.prisma.user.create({
        data: { username, password: hashedPassword },
      });
    } catch (e) {
      if (e.code === 'P2002') {
        throw new ConflictException('That username is taken!');
      }
    }

    return user;
  }

  async logIn(dto: AuthCredentialsDto): Promise<{ accessToken: string }> {
    const { username, password } = dto;
    const user = await this.prisma.user.findUnique({ where: { username } });

    if (user && (await bcrypt.compare(password, user.password))) {
      const payload: JwtPayload = { username };
      const accessToken: string = this.jwtService.sign(payload);
      return { accessToken };
    } else {
      throw new ForbiddenException('username/password incorrect');
    }
  }
}
