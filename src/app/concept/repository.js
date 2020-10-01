/* eslint-disable max-len */
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
    queryFilter,
    scopes,
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
    queryFilter,
    scopes,
  ) {
    return this.model
      .scope(scopes || 'defaultScope')
      .findAll(queryFilter || null);
  }

  /**
   *
   * @param {[] | string} scopes
   * @param {import("Sequelize").FindOptions} queryFilter
   */
  findOne(queryFilter, scopes = 'defaultScope') {
    return this.model
      .scope(scopes)
      .findOne(queryFilter);
  }

    /**
   *
   * @param {[] | string} scopes
   * @param {number} id
   * @param {import("Sequelize").FindOptions} queryFilter
   */
  findByPk(id, scopes = 'defaultScope', queryFilter = null) {
    return this.model
    .scope(scopes)
    .findByPk(id, queryFilter);
  }

  /**
   * @param {any} dto
   * @param {{transaction: import('sequelize').Transaction; conditions: import('sequelize').WhereOptions; }} options
   */
  findNotCreate(dto, options, scopes = 'defaultScope') {
    const {
      transaction,
      conditions,
    } = options || {};
    return this.model.scope(scopes).findOrCreate({
      where: conditions,
      defaults: dto,
      transaction,
  });
  }

  /**
   * @param {any} dto
   * @param {{transaction ?: import("sequelize").Transaction, include ?: []}} options
   */
  createOne(dto, options) {
    const { transaction, include } = options || {};
    return this.model.create(dto, {
      transaction,
      include,
    });
  }

  updateOne(dto, options) {
    const {
      transaction,
      fields,
    } = options || {};
    let { conditions } = options || {};
    if (isUndefined(conditions)) {
      const { id } = dto;
      conditions = {
        id,
      };
    }
    return this.model.update(dto, {
      transaction,
      where: conditions,
      fields,
    });
  }

  /**
   * @param {[] | string} scopes
   * @param {number} id
   * @param {import("Sequelize").FindOptions} queryFilter
   */
  async softDelete(id,
    scopes = 'defaultScope',
    queryFilter = null) {
    const dto = await this.findByPk(id, scopes, queryFilter);
    await dto.destroy();
  }
}
