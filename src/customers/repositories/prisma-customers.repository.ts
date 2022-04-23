import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../database/prisma';
import { CustomersRepository } from './customers.repository';
import { CreateCustomerDto } from '../dto/create-customer.dto';
import { FindCustomersQueryDto } from '../dto/find-customers-query.dto';
import { UpdateCustomerDto } from '../dto/update-customer.dto';
import { Customer } from '../entities/customer.entity';

@Injectable()
export class PrismaCustomersRepository implements CustomersRepository {
  constructor(private readonly prismaService: PrismaService) {}

  create(createCustomerDto: CreateCustomerDto): Promise<Customer> {
    return this.prismaService.customer
      .create({ data: createCustomerDto })
      .then((customer) => customer && new Customer(customer));
  }

  findAll(findCustomersQueryDto: FindCustomersQueryDto): Promise<Customer[]> {
    const { page, size: take, name, email, birthDate } = findCustomersQueryDto;
    const skip = (page - 1) * take;

    return this.prismaService.customer
      .findMany({
        skip,
        take,
        where: {
          name: { contains: name },
          email,
          birthDate,
        },
      })
      .then((customers) =>
        customers.map((customer) => customer && new Customer(customer)),
      );
  }

  findOne(id?: string, email?: string): Promise<Customer> {
    return this.prismaService.customer
      .findUnique({
        where: { id, email },
      })
      .then((customer) => customer && new Customer(customer));
  }

  update(id: string, updateCustomerDto: UpdateCustomerDto): Promise<Customer> {
    return this.prismaService.customer
      .update({
        where: { id },
        data: updateCustomerDto,
      })
      .then((customer) => customer && new Customer(customer));
  }

  remove(id: string): Promise<Customer> {
    return this.prismaService.customer
      .delete({
        where: { id },
      })
      .then((customer) => customer && new Customer(customer));
  }
}
