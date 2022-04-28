import { validate } from 'class-validator';
import { plainToInstance } from 'class-transformer';
import { FindCustomersDto } from './find-customers.dto';

describe('FindCustomersDto', () => {
  it('should validate the minimum page and maximum size', async () => {
    const errors = await validate(
      plainToInstance(FindCustomersDto, { page: 0, size: 200 }),
    ).then((errors) =>
      errors.reduce((accumulator, { property, constraints }) => {
        return {
          ...accumulator,
          [property]: constraints,
        };
      }, {}),
    );

    expect(Object.keys(errors).length).toBe(2);
    expect(errors['page']).toEqual({ min: expect.any(String) });
    expect(errors['size']).toEqual({ max: expect.any(String) });
  });
});
