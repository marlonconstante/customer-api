import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { CustomersModule } from './customers.module';
import { CustomersRepository } from './repositories/customers.repository';
import { InMemoryCustomersRepository } from './repositories/in-memory-customers.repository';

describe('CustomersController (e2e)', () => {
  let app: INestApplication;
  let repository: CustomersRepository;
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
    repository = new InMemoryCustomersRepository();

    const module: TestingModule = await Test.createTestingModule({
      imports: [CustomersModule],
    })
      .overrideProvider('CustomersRepository')
      .useValue(repository)
      .compile();

    app = module.createNestApplication();
    await app.init();
  });

  it('POST /customers', async () => {
    const { body } = await request(app.getHttpServer())
      .post('/customers')
      .send(marlon)
      .expect(201);

    expect(body.id).toBeDefined();
    expect(body.age).toBeDefined();
    expect(body.name).toBe(marlon.name);
    expect(body.email).toBe(marlon.email);
    expect(body.birthDate).toBe(marlon.birthDate.toISOString());
  });

  it('GET /customers', async () => {
    const customers = await Promise.all([
      repository.create(marlon),
      repository.create(mirela),
      repository.create(laura),
    ]).then((customers) => customers.map((customer) => customer.toJSON()));

    const { body } = await request(app.getHttpServer())
      .get('/customers')
      .query({ page: 1, size: 10 })
      .expect(200);

    expect(body.length).toBe(3);
    expect(body).toEqual(expect.arrayContaining(customers));
  });

  it('GET /customers/:id', async () => {
    const customer = await repository
      .create(marlon)
      .then((customer) => customer.toJSON());

    const { body } = await request(app.getHttpServer())
      .get(`/customers/${customer.id}`)
      .expect(200);

    expect(body).toEqual(customer);
  });

  it('PATCH /customers/:id', async () => {
    const customer = await repository
      .create(marlon)
      .then((customer) => customer.toJSON());

    const data = {
      name: 'Marlon Santos Constante',
      email: 'marlonsconstante@gmail.com',
    };

    const { body } = await request(app.getHttpServer())
      .patch(`/customers/${customer.id}`)
      .send(data)
      .expect(200);

    expect(body).toEqual({ ...customer, ...data });
  });

  it('DELETE /customers/:id', async () => {
    const customer = await repository
      .create(marlon)
      .then((customer) => customer.toJSON());

    await request(app.getHttpServer())
      .delete(`/customers/${customer.id}`)
      .expect(204);
  });
});
