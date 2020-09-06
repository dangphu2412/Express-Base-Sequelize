import { each } from 'lodash';
import { Models } from '../../../models';

const { Permission, Module, Method } = Models;

export class PermissionSeeder {
  constructor(logger) {
    this.tableName = 'Permission';
    this.model = Permission;
    this.logger = logger;
  }

  toDto(_modules, _methods) {
    const data = [];
    each(_modules, module => {
      each(_methods, method => {
        data.push({
          name: `${module.name}_${method.name}`,
          methodId: method.id,
          moduleId: module.id,
        });
      });
    });

    return data;
  }

  async start(transaction) {
    this.logger.info(`Insert ${this.tableName}`);
    const [_modules, _methods] = await this.getSample(transaction);
    const pers = await this.model.bulkCreate(this.toDto(_modules, _methods), { transaction });
    return pers;
  }

  back() {

  }

  getSample(transaction) {
    return Promise.all([
      Module.findAll({ transaction }),
      Method.findAll({ transaction }),
    ]);
  }
}
