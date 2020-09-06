import { modules } from '../../../../common/constants';
import { Models } from '../../../models';

const { Module } = Models;

export class ModuleSeeder {
  constructor(logger) {
    this.tableName = 'Module';
    this.model = Module;
    this.logger = logger;
    this.sample = modules;
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
