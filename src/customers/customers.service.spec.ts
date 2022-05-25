import {
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { CustomersService } from './customers.service';
import { InMemoryCustomersRepository } from './repositories/in-memory-customers.repository';

describe('CustomersService', () => {
  let service: CustomersService;
  const marlon = {
    name: 'Marlon Constante',
    email: 'marlon.constante@gmail.com',
    birthDate: new Date('1986/08/18'),
  };
  const mirela = {
    name: 'Mirela Paiva',
    email: 'mirela.paivab@gmail.com',
    birthDate: new Date('1984/03/26'),
  };
  const laura = {
    name: 'Laura Paiva',
    email: 'laurapconstante@gmail.com',
    birthDate: new Date('2013/04/12'),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CustomersService,
        {
          provide: 'CustomersRepository',
          useClass: InMemoryCustomersRepository,
        },
      ],
    }).compile();

    service = module.get<CustomersService>(CustomersService);
  });

  it('should be defined service for customers', () => {
    expect(service).toBeDefined();
  });

  it('should be able to create a customer', async () => {
    const customer = await service.create(marlon);

    expect(customer.id).toBeDefined();
    expect(customer.age).toBeDefined();
  });

  it('should not be able to create a customer with existing email', async () => {
    await service.create(marlon);

    await expect(() => service.create(marlon)).rejects.toThrow(
      UnprocessableEntityException,
    );
  });

  it('should be able to find the customers', async () => {
    await Promise.all([
      service.create(marlon),
      service.create(mirela),
      service.create(laura),
    ]);

    const pagination = { page: 1, size: 10 };
    const allCustomers = await service.findAll(pagination);
    const filteredCustomers = await service.findAll({
      ...pagination,
      ...laura,
    });

    expect(allCustomers.length).toBe(3);
    expect(filteredCustomers.length).toBe(1);
  });

  it('should be able to find the customer by id', async () => {
    const { id } = await service.create(marlon);
    const customer = await service.findOne(id);

    expect(customer.id).toBe(id);
  });

  it('should not be able to find a customer with non-existent id', async () => {
    await expect(() =>
      service.findOne('06f5b32c-d653-4f09-b506-9ba6bfa12115'),
    ).rejects.toThrow(NotFoundException);
  });

  it('should be able to update customer by id', async () => {
    const { id } = await service.create(marlon);
    const data = {
      name: 'Marlon Santos Constante',
      email: 'marlonsconstante@gmail.com',
    };

    const customer = await service.update(id, data);
    expect(customer.id).toBe(id);
    expect(customer.name).toBe(data.name);
    expect(customer.email).toBe(data.email);
  });

  it('should be able to remove customer by id', async () => {
    const { id } = await service.create(marlon);
    const customer = await service.remove(id);

    expect(customer.id).toBe(id);
  });
});
