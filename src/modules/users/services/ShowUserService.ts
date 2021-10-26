import AppError from '@shared/errors/AppError';
import { getCustomRepository } from 'typeorm';
import User from '../typeorm/entities/User';
import { UserRepository } from '../typeorm/repositories/UsersRepository';

interface IRequest {
  id: string;
}

class ShowUserService {
  public async execute({ id }: IRequest): Promise<User | undefined> {
    const UsersRepository = getCustomRepository(UserRepository);

    const User = await UsersRepository.findOne(id);

    if (!User) {
      throw new AppError('User not found');
    }

    return User;
  }
}

export default ShowUserService;
