import { methods } from '../../../../common/constants';
import { Models } from '../../../models';

const { Method } = Models;

export class MethodSeeder {
  constructor(logger) {
    this.tableName = 'Method';
    this.model = Method;
    this.logger = logger;
    this.sample = methods;
  }

  toDto() {
    return Object.keys(this.sample).map(key => ({
      name: this.sample[key],
    }));
  }

  start(transaction) {
    this.logger.info(`Insert ${this.tableName}`);
    return this.model.bulkCreate(this.toDto(), { transaction });
  }

  back() {

  }
}
