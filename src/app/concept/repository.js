/* eslint-disable no-unused-vars */
// @ts-check
import { isUndefined } from 'lodash';
import { SequelizeFilter } from '../../utils/dbHelper';

export class BaseRepository {
  model;

  /**
   * @param {[]} scopes
   * @param {SequelizeFilter} queryFilter
   */
  findAllAndCount(
    scopes,
    queryFilter,
  ) {
    return this.model
      .scope(scopes || 'defaultScope')
      .findAllAndCount(queryFilter);
  }

    /**
   * @param {[]} scopes
   * @param {import("sequelize").FindOptions} queryFilter
   */
  findAll(
    scopes,
    queryFilter,
  ) {
    return this.model
      .scope(scopes || 'defaultScope')
      .findAll(queryFilter || null);
  }

  findOne(scopes, queryFilter) {
    return this.model
      .scope(scopes || 'defaultScope')
      .findOne(queryFilter || null);
  }

  findNotCreate(dto, {
    transaction,
    conditions,
    attributes,
  }) {
    return this.model.findOrCreate({
      where: conditions,
      defaults: dto,
      transaction,
      attributes,
  });
  }

  /**
   * @param {any} dto
   * @param {{transaction: import("sequelize").Transaction, include: []}} options
   */
  createOne(dto, {
    transaction = null,
    include = null,
  }) {
    return this.model.create(dto, {
      transaction,
      include,
    });
  }

  updateOne(dto, {
    conditions,
    transaction = null,
    fields = null,
  }) {
    if (isUndefined(conditions)) {
      const { id } = dto;
      Object.assign(conditions, id);
    }
    return this.model.update(dto, {
      transaction,
      where: conditions,
      fields,
    });
  }

  async softDelete(id) {
    const dto = await this.findOne('defaultScope', {
      conditions: {
        id,
      },
    });
    await dto.destroy();
  }
}
