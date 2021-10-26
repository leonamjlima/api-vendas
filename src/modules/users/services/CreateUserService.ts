import AppError from '@shared/errors/AppError';
import { hash } from 'bcryptjs';
import { getCustomRepository } from 'typeorm';
import User from '../typeorm/entities/User';
import { UserRepository } from '../typeorm/repositories/UsersRepository';

interface IRequest {
  name: string;
  email: string;
  password: string;
}

class CreateUserService {
  public async execute({ name, email, password }: IRequest): Promise<User> {
    const UsersRepository = getCustomRepository(UserRepository);
    const emailExists = await UsersRepository.findByEmail(email);

    if (emailExists) {
      throw new AppError('Email addres already used.');
    }

    const hashedPassword = await hash(password, 8);

    const User = UsersRepository.create({
      name,
      email,
      password: hashedPassword,
    });

    await UsersRepository.save(User);
    return User;
  }
}

export default CreateUserService;
