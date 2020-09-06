import faker from 'faker';
import { UserStatus } from '../../../../common/constants';
import { Models } from '../../../models';
import { bcryptService } from '../../../../plugin';
import { Random } from './random';

const { User } = Models;

export class UserSeeder {
  constructor(logger) {
    this.model = User;
    this.logger = logger;
    this.tableName = 'User';
    this.random = new Random();
  }

  toDto() {
    return {
      name: `${faker.name.firstName()} ${faker.name.lastName()}`,
      status: UserStatus.ACTIVATED,
      roleId: 2,
      createdAt: this.random.randomDate(new Date(2020, 0, 1), new Date()),
      updatedAt: this.random.randomDate(new Date(2020, 0, 1), new Date()),
    };
  }

  start(transaction) {
    this.logger.info(`Insert ${this.tableName}`);
    return this.model.bulkCreate(this.getSample(), { transaction });
  }

  back() {

  }

  getSample() {
    const sample = [];
    const prefix = 30;
    const hashPwd = bcryptService.hashSync('123456');
    for (let i = 0; i < prefix; i += 1) {
      const dto = this.toDto();
      dto.hashPwd = hashPwd;
      sample.push(dto);
    }

    sample.push({
      name: 'admin@gmail.com',
      password: hashPwd,
      status: UserStatus.ACTIVATED,
      roleId: 1,
    });
    return sample;
  }
}
