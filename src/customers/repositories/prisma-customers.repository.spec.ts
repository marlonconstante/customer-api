import { Test, TestingModule } from '@nestjs/testing';
import { MockProxy, mock } from 'jest-mock-extended';
import { PrismaCustomersRepository } from './prisma-customers.repository';
import { PrismaService } from '../../database/prisma';

type PrismaCustomer = Pick<
  PrismaService['customer'],
  'create' | 'findMany' | 'findUnique' | 'update' | 'delete'
>;

describe('PrismaCustomersRepository', () => {
  let repository: PrismaCustomersRepository;
  let service: PrismaService;
  const marlon = {
    name: 'Marlon Constante',
    email: 'marlon.constante@gmail.com',
    birthDate: new Date('1986/08/18'),
  };
  const customer = {
    id: 'aa685f75-12f3-42e8-9919-14c3dea7a2c0',
    ...marlon,
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  function mockPrismaService() {
    const prisma = {
      customer: mock() as MockProxy<PrismaCustomer>,
    };

    prisma.customer.create.mockResolvedValue(customer);
    prisma.customer.findMany.mockResolvedValue([customer]);
    prisma.customer.findUnique.mockResolvedValue(customer);
    prisma.customer.update.mockResolvedValue(customer);
    prisma.customer.delete.mockResolvedValue(customer);

    return prisma as unknown as PrismaService;
  }

  beforeEach(async () => {
    service = mockPrismaService();

    const module: TestingModule = await Test.createTestingModule({
      providers: [PrismaService, PrismaCustomersRepository],
    })
      .overrideProvider(PrismaService)
      .useValue(service)
      .compile();

    repository = module.get<PrismaCustomersRepository>(
      PrismaCustomersRepository,
    );
  });

  it('should be defined prisma repository for customers', () => {
    expect(repository).toBeDefined();
  });

  it('should have called prisma service to create a customer', async () => {
    const createCustomer = jest.spyOn(service.customer, 'create');
    await repository.create(marlon);

    expect(createCustomer).toBeCalledTimes(1);
    expect(createCustomer).toBeCalledWith({ data: marlon });
  });

  it('should have called prisma service to find many customers', async () => {
    const findManyCustomer = jest.spyOn(service.customer, 'findMany');
    await repository.findAll({ page: 2, size: 10, ...marlon });

    expect(findManyCustomer).toBeCalledTimes(1);
    expect(findManyCustomer).toBeCalledWith({
      skip: 10,
      take: 10,
      where: {
        ...marlon,
        name: { contains: marlon.name },
      },
    });
  });

  it('should have called prisma service to find unique customer', async () => {
    const findUniqueCustomer = jest.spyOn(service.customer, 'findUnique');
    await repository.findOne(customer.id);

    expect(findUniqueCustomer).toBeCalledTimes(1);
    expect(findUniqueCustomer).toBeCalledWith({
      where: { id: customer.id },
    });
  });

  it('should have called prisma service to update a customer', async () => {
    const updateCustomer = jest.spyOn(service.customer, 'update');
    await repository.update(customer.id, marlon);

    expect(updateCustomer).toBeCalledTimes(1);
    expect(updateCustomer).toBeCalledWith({
      where: { id: customer.id },
      data: marlon,
    });
  });

  it('should have called prisma service to delete a customer', async () => {
    const deleteCustomer = jest.spyOn(service.customer, 'delete');
    await repository.remove(customer.id);

    expect(deleteCustomer).toBeCalledTimes(1);
    expect(deleteCustomer).toBeCalledWith({
      where: { id: customer.id },
    });
  });
});
