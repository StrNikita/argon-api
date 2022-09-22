import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SignupByPasswordDto } from '../auth/dto/signup-by-password.dto';
import { User } from '../user/user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  public async getUserById(id: number): Promise<User> {
    return this.userRepository.findOneBy({ id });
  }

  public async getUserByEmail(email: string): Promise<User> {
    return this.userRepository.findOneBy({ email });
  }

  public async create(userData: SignupByPasswordDto) {
    const userEntity = this.userRepository.create(userData);

    return this.userRepository.save(userEntity);
  }
}
