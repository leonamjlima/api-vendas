import AppError from '@shared/errors/AppError';
import { getCustomRepository } from 'typeorm';
import User from '../typeorm/entities/User';
import { UserRepository } from '../typeorm/repositories/UsersRepository';

interface IRequest {
  id: string;
  name: string;
  email: string;
  password: string;
}

class UpdateUserService {
  public async execute({ id, name, email, password }: IRequest): Promise<User> {
    const UsersRepository = getCustomRepository(UserRepository);

    const User = await UsersRepository.findOne(id);
    if (!User) {
      throw new AppError('User not found');
    }

    User.name = name;
    User.email = email;
    User.password = password;

    await UsersRepository.save(User);

    return User;
  }
}

export default UpdateUserService;
