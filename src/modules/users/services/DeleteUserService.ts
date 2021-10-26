import AppError from '@shared/errors/AppError';
import { getCustomRepository } from 'typeorm';
import { UserRepository } from '../typeorm/repositories/UsersRepository';

interface IRequest {
  id: string;
}

class DeleteUserService {
  public async execute({ id }: IRequest): Promise<void> {
    const UsersRepository = getCustomRepository(UserRepository);

    const User = await UsersRepository.findOne(id);

    if (!User) {
      throw new AppError('User not found');
    }

    await UsersRepository.remove(User);
  }
}

export default DeleteUserService;
