import { forOwn } from 'lodash';
import { FILTER } from '../../common/constants';

export class SequelizeFilter {
    constructor(query) {
      const page = query.page - 1 || FILTER.PAGE;
      const amount = query.amount || FILTER.AMOUNT;

      this.offset = (page - 1) * amount;
      this.limit = amount;
      this.order = query.order || null;
      this.where = query.conditions || null;
      this.tracsaction = query.transaction || null;
      if (query.exlucde) {
        this.attributes.exclude = query.exlucde;
      }
      // Options
      forOwn(query, (value, key) => {
        this[key] = value;
      });
    }

    getFilter() {
      const filter = {};
      Object.keys(this).forEach(key => {
        filter[key] = this[key];
      });
      return filter;
    }
}

export * from './method';
