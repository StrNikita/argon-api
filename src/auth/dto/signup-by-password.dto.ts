import { IsString, IsEmail, MinLength } from 'class-validator';

export class SignupByPasswordDto {
  @IsString()
  @IsEmail()
  email: string;

  @IsString()
  @MinLength(8)
  password: string;

  @IsString()
  name: string;
}
