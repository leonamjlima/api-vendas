import { getCustomRepository } from 'typeorm';
import Customer from '../typeorm/entities/Customer';
import { CustomersRepository } from '../typeorm/repositories/CustomersRepository';

interface IPaginateCustomer {
  from: number;
  to: number;
  per_page: number;
  total: number | number;
  current_page: number;
  prev_page?: number | null;
  next_page?: number | null;
  last_page: number | null;
  data: Customer[];
}

class ListCustomerService {
  public async execute(): Promise<IPaginateCustomer | undefined> {
    try {
      const customersRepository = getCustomRepository(CustomersRepository);

      const customers = await customersRepository
        .createQueryBuilder()
        .paginate();

      // const customers = await customersRepository
      //   .createQueryBuilder('customers')
      //   .paginate(15);

      return customers as IPaginateCustomer;
    } catch (error) {
      console.log(error);
    }
  }
}

export default ListCustomerService;
