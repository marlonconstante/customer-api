import {
  Inject,
  Injectable,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { FindCustomersQueryDto } from './dto/find-customers-query.dto';
import { UpdateCustomerDto } from './dto/update-customer.dto';
import { CustomersRepository } from './repositories/customers.repository';

@Injectable()
export class CustomersService {
  constructor(
    @Inject('CustomersRepository')
    private readonly customersRepository: CustomersRepository,
  ) {}

  async create(createCustomerDto: CreateCustomerDto) {
    const { email } = createCustomerDto;
    const customer = await this.customersRepository.findOne(undefined, email);
    if (customer) throw new UnprocessableEntityException();

    return this.customersRepository.create(createCustomerDto);
  }

  findAll(findCustomersQueryDto: FindCustomersQueryDto) {
    return this.customersRepository.findAll(findCustomersQueryDto);
  }

  async findOne(id: string) {
    const customer = await this.customersRepository.findOne(id);
    if (!customer) throw new NotFoundException();

    return customer;
  }

  async update(id: string, updateCustomerDto: UpdateCustomerDto) {
    await this.findOne(id);

    return this.customersRepository.update(id, updateCustomerDto);
  }

  async remove(id: string) {
    await this.findOne(id);

    return this.customersRepository.remove(id);
  }
}
