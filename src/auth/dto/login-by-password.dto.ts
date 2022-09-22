import { IsString, IsEmail } from 'class-validator';

export class LoginByPasswordDto {
  @IsString()
  @IsEmail()
  email: string;

  @IsString()
  password: string;
}
