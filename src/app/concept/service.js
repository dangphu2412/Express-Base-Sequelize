// @ts-check
import {
  SequelizeFilter, addMany, setMany,
  mapKeyUpdate, databaseErrorHelper, Conflict,
} from '../../utils';
import { sequelize } from '../../database/models';

export class BaseService {
  repository;

  findAndCountAll(query, scopes) {
    const builderFilter = new SequelizeFilter(query);
    return this.repository.findAndCountAll(builderFilter.filter, scopes);
  }

  findAll(query, scopes = 'defaultScope') {
    const builderFilter = new SequelizeFilter(query);
    return this.repository.findAll(builderFilter.filter, scopes);
  }

  async createOne(dto, relations, transaction = null, customErrorInstance = undefined) {
    let isExistCurrentTransaction = false;

    if (transaction === null) {
      isExistCurrentTransaction = true;
      // eslint-disable-next-line no-param-reassign
      transaction = await sequelize.transaction();
    }
    try {
      const include = relations?.hasMany;
      const srcDto = await this.repository.createOne(dto, {
        transaction,
        include,
      });

      if (relations.manyToMany) {
        await addMany(srcDto, dto, relations.manyToMany, transaction);
      }
      if (isExistCurrentTransaction) {
        await transaction.commit();
      }
      return srcDto;
    } catch (err) {
      if (isExistCurrentTransaction) {
        await transaction.rollback();
      }
      const message = databaseErrorHelper(err, customErrorInstance);
      throw new Conflict(message);
    }
  }

  async updateOne(
    srcDto,
    updateDto,
    relations,
    transaction = null,
    customErrorInstance = undefined,
  ) {
    let isExistCurrentTransaction = false;

    if (transaction === null) {
      isExistCurrentTransaction = true;
      // eslint-disable-next-line no-param-reassign
      transaction = await sequelize.transaction();
    }
    try {
      const fields = mapKeyUpdate(srcDto, updateDto);

      await this.repository.updateOne(updateDto, {
        transaction,
        fields,
      });

      if (relations.manyToMany) {
        await setMany(srcDto, updateDto, relations.manyToMany, transaction);
      }
      if (isExistCurrentTransaction) {
        await transaction.commit();
      }
    } catch (err) {
      if (isExistCurrentTransaction) {
        await transaction.rollback();
      }
      const message = databaseErrorHelper(err, customErrorInstance);
      throw new Conflict(message);
    }
  }

  softDelete(id) {
    return this.repository.softDelete(id);
}
}
