import { ConflictException, Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';

@Injectable()
export class AuthService {
  constructor(private readonly prisma: PrismaService) {}

  async createUser(dto: AuthCredentialsDto): Promise<User> {
    let user: User;

    try {
      user = await this.prisma.user.create({
        data: dto,
      });
    } catch (e) {
      if (e.code === 'P2002') {
        throw new ConflictException('That username is taken!');
      }
    }
    return user;
  }
}
