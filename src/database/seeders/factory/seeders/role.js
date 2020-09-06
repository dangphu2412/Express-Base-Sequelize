import { map } from 'lodash';
import { addMany } from '../../../../utils/dbHelper';
import { roles } from '../../../../common/constants';
import { Models } from '../../../models';

const { Role } = Models;

export class RoleSeeder {
  constructor(logger) {
    this.tableName = 'Role';
    this.model = Role;
    this.logger = logger;
    this.sample = roles;
  }

  toDto() {
    return Object.keys(this.sample).map(key => ({
      name: this.sample[key],
      description: 'Prefix description',
    }));
  }

  async start(transaction, permissions) {
    const relations = ['permissions'];
    this.logger.info(`Insert ${this.tableName}`);
    const _roles = await this.model.bulkCreate(this.toDto(), { transaction });
    const ids = map(permissions, permission => permission.id);

    await Promise.all(map(_roles, role => {
      const cloneRole = role;
      cloneRole['permissionIds'] = ids;
      return addMany(cloneRole, relations, transaction);
    }));
  }

  back() {

  }
}
