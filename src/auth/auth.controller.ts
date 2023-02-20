import { Body, Controller, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/signup')
  async createUser(@Body() dto: AuthCredentialsDto): Promise<void> {
    await this.authService.createUser(dto);
    return;
  }

  @Post('/login')
  async logIn(@Body() dto: AuthCredentialsDto) {
    return this.authService.logIn(dto);
  }
}
