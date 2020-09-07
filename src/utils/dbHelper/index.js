import { forOwn } from 'lodash';
import { FILTER } from '../../common/constants';

export class SequelizeFilter {
    constructor(query) {
      const page = query.page || FILTER.PAGE;
      const amount = query.amount || FILTER.AMOUNT;
      /* findOptions sequelize not receive class instance
      *  So save as an object in this.queryBuilder
      */
      this.queryBuilder = {};
      this.queryBuilder.offset = (page - 1) * amount;
      this.queryBuilder.limit = amount;
      this.queryBuilder.order = query.order || null;
      this.queryBuilder.where = query.conditions || null;
      this.queryBuilder.tracsaction = query.transaction || null;
      if (query.exlucde) {
        this.queryBuilder.attributes.exclude = query.exlucde;
      }
      // Options
      forOwn(query, (value, key) => {
        this.queryBuilder[key] = value;
      });
    }

    getFilter() {
      return this.queryBuilder;
    }
}

export * from './method';
