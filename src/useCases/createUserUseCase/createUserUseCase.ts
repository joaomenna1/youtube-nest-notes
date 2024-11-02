import { Injectable } from '@nestjs/common';
import { hash } from 'bcrypt';
import { User } from '../../modules/entities/User';
import { UserRepository } from '../../modules/repositories/UserRepository';

interface CreateUserRequest {
  name: string;
  email: string;
  password: string;
}

@Injectable()
export class CreateUserUseCase {
  constructor(private userRepository: UserRepository) {}

  async execute({ name, email, password }: CreateUserRequest) {
    const user = new User({
      name,
      email,
      password: await hash(password, 10),
    });

    await this.userRepository.create(user);

    return user;
  }
}
