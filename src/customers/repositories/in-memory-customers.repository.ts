import { randomUUID } from 'crypto';
import { Injectable } from '@nestjs/common';
import { CustomersRepository } from './customers.repository';
import { CreateCustomerDto } from '../dto/create-customer.dto';
import { FindCustomersQueryDto } from '../dto/find-customers-query.dto';
import { UpdateCustomerDto } from '../dto/update-customer.dto';
import { Customer } from '../entities/customer.entity';

@Injectable()
export class InMemoryCustomersRepository implements CustomersRepository {
  private customers: Customer[] = [];

  async create(createCustomerDto: CreateCustomerDto): Promise<Customer> {
    const customer = new Customer({ ...createCustomerDto, id: randomUUID() });
    this.customers.push(customer);

    return customer;
  }

  async findAll(
    findCustomersQueryDto: FindCustomersQueryDto,
  ): Promise<Customer[]> {
    const { page, size, name, email, birthDate } = findCustomersQueryDto;

    return this.customers
      .slice((page - 1) * size, page * size)
      .filter((customer) => {
        return [
          !name || customer.name.includes(name),
          !email || customer.email === email,
          !birthDate || customer.birthDate.getTime() === birthDate.getTime(),
        ].every((condition) => condition);
      });
  }

  async findOne(id?: string, email?: string): Promise<Customer> {
    return this.customers.find(
      (customer) => customer.id === id || customer.email === email,
    );
  }

  async update(
    id: string,
    updateCustomerDto: UpdateCustomerDto,
  ): Promise<Customer> {
    const customer = this.customers.find((customer) => customer.id === id);
    if (customer) {
      Object.entries(updateCustomerDto).forEach(([key, value]) => {
        customer[key] = value;
      });

      return customer;
    }
  }

  async remove(id: string): Promise<Customer> {
    const customer = this.customers.find((customer) => customer.id === id);
    if (customer) {
      this.customers.splice(this.customers.indexOf(customer), 1);

      return customer;
    }
  }
}
