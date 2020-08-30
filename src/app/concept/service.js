// @ts-check
import { SequelizeFilter, addMany } from '../../utils/dbHelper';
import { sequelize } from '../../database/models';

export class BaseService {
  repository;

  findAndCountAll(query, scopes) {
    const builderFilter = new SequelizeFilter(query);
    return this.repository.findAndCountAll(scopes, builderFilter);
  }

  findAll(query, scopes) {
    const builderFilter = new SequelizeFilter(query);
    return this.repository.findAll(scopes, builderFilter);
  }

  async createOne(dto, relations) {
    const transaction = await sequelize.transaction({ autocommit: true });
    try {
      const srcDto = await this.repository.createOne(dto, {
        transaction,
        include: relations.hasMany,
      });

      await addMany(srcDto, relations.manyToMany);
    } catch (err) {
      await transaction.rollback();
      throw err;
    }
  }
}
