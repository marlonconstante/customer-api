import { CreateCustomerDto } from '../dto/create-customer.dto';
import { FindCustomersDto } from '../dto/find-customers.dto';
import { UpdateCustomerDto } from '../dto/update-customer.dto';
import { Customer } from '../entities/customer.entity';

export interface CustomersRepository {
  create(createCustomerDto: CreateCustomerDto): Promise<Customer>;

  findAll(findCustomersDto: FindCustomersDto): Promise<Customer[]>;

  findOne(id?: string, email?: string): Promise<Customer>;

  update(id: string, updateCustomerDto: UpdateCustomerDto): Promise<Customer>;

  remove(id: string): Promise<Customer>;
}
