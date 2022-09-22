import {
  BadRequestException,
  Body,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
import { SuccessDto, SUCCESS_TRUE } from '../shared/dto/status.dto';
import { SignupByPasswordDto } from './dto/signup-by-password.dto';
import { UserService } from '../user/user.service';
import { LoginByPasswordDto } from './dto/login-by-password.dto';
import { LoginResponse } from './models/login-response.payload';
import { AuthResponse } from './models/auth-response.payload';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  public async auth(access_token: string): Promise<AuthResponse> {
    try {
      const data = await this.jwtService.verifyAsync(access_token);
      if (!data) {
        throw new UnauthorizedException();
      }

      const { name } = await this.userService.getUserById(data.id);
      return { name };
    } catch (e) {
      throw new UnauthorizedException();
    }
  }
  public async signupByPassword(
    userData: SignupByPasswordDto,
  ): Promise<SuccessDto> {
    const user = await this.userService.getUserByEmail(userData.email);
    if (user) {
      throw new BadRequestException('Email is already taken');
    }

    const hashedPassword = await bcrypt.hash(userData.password, 12);
    this.userService.create({
      email: userData.email,
      name: userData.name,
      password: hashedPassword,
    });

    return SUCCESS_TRUE;
  }

  public async loginByPassword(
    @Body() { email, password }: LoginByPasswordDto,
  ): Promise<LoginResponse> {
    const user = await this.userService.getUserByEmail(email);

    if (!user) {
      throw new BadRequestException('Invalid credential');
    }

    if (!(await bcrypt.compare(password, user.password))) {
      throw new BadRequestException('Invalid credential');
    }

    return {
      access_token: await this.jwtService.signAsync({ id: user.id }),
    };
  }
}
