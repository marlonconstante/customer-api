import { ApiProperty } from '@nestjs/swagger';
import * as dayjs from 'dayjs';

export class Customer {
  @ApiProperty()
  id: string;

  @ApiProperty()
  name: string;

  @ApiProperty()
  email: string;

  @ApiProperty()
  birthDate: Date;

  constructor(data?: Partial<Customer>) {
    if (data) {
      this.id = data.id;
      this.name = data.name;
      this.email = data.email;
      this.birthDate = data.birthDate;
    }
  }

  @ApiProperty()
  get age(): number {
    return dayjs().diff(this.birthDate, 'year');
  }

  toJSON() {
    return {
      ...this,
      birthDate: dayjs(this.birthDate).toISOString(),
      age: this.age,
    };
  }
}
