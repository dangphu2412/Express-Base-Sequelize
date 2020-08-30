// @ts-check
// eslint-disable-next-line no-unused-vars
import { SequelizeFilter } from '../../utils/dbHelper';

export class BaseService {
  constructor(model) {
    this.model = model;
  }

  /**
   * @param {[]} scopes
   * @param {SequelizeFilter} queryFilter
   */
  findAllAndCount(
    scopes,
    queryFilter,
  ) {
    return this.model
      .scopes(scopes || 'defaultScope')
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
      .scopes(scopes || 'defaultScope')
      .findAll(queryFilter);
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
}
