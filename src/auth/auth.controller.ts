import {
  Body,
  Controller,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { SuccessDto } from '../shared/dto/status.dto';
import { AuthService } from './auth.service';
import { authDto } from './dto/auth.dto';
import { LoginByPasswordDto } from './dto/login-by-password.dto';
import { SignupByPasswordDto } from './dto/signup-by-password.dto';
import { AuthResponse } from './models/auth-response.payload';
import { LoginResponse } from './models/login-response.payload';

@Controller('/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/')
  @UsePipes(ValidationPipe)
  public async auth(@Body() { access_token }: authDto): Promise<AuthResponse> {
    try {
      return this.authService.auth(access_token);
    } catch (e) {
      throw e;
    }
  }

  @Post('/signup')
  @UsePipes(ValidationPipe)
  public async signupByPassword(
    @Body() user: SignupByPasswordDto,
  ): Promise<SuccessDto> {
    try {
      return this.authService.signupByPassword(user);
    } catch (e) {
      throw e;
    }
  }

  @Post('/login')
  @UsePipes(ValidationPipe)
  public async loginByPassword(
    @Body() user: LoginByPasswordDto,
  ): Promise<LoginResponse> {
    try {
      return this.authService.loginByPassword(user);
    } catch (e) {
      throw e;
    }
  }
}
