// @ts-check
import {
  SequelizeFilter, addMany, setMany, mapKeyUpdate,
} from '../../utils';
import { sequelize } from '../../database/models';

export class BaseService {
  repository;

  findAndCountAll(query, scopes) {
    const builderFilter = new SequelizeFilter(query);
    return this.repository.findAndCountAll(scopes, builderFilter.getFilter());
  }

  findAll(query, scopes = 'defaultScope') {
    const builderFilter = new SequelizeFilter(query);
    return this.repository.findAll(scopes, builderFilter.getFilter());
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

  async updateOne(dto, relations) {
    const transaction = await sequelize.transaction({ autocommit: true });
    try {
      const fields = mapKeyUpdate(dto);
      const srcDto = await this.repository.updateOne(dto, {
        transaction,
        fields,
      });

      await setMany(srcDto, relations.manyToMany);
    } catch (err) {
      await transaction.rollback();
      throw err;
    }
  }

  softDelete(id) {
    return this.repository.softDelete(id);
}
}
