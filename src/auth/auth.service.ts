import { ConflictException, Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(private readonly prisma: PrismaService) {}

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
}
