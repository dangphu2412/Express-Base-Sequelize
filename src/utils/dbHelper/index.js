import { forOwn } from 'lodash';
import { FILTER } from '../../common/constants';

export class SequelizeFilter {
    constructor(query) {
      this.page = query.page || FILTER.PAGE;
      this.amount = query.amount || FILTER.AMOUNT;
      this.order = query.order || FILTER.ORDER;
      this.where = query.conditions || null;
      this.tracsaction = query.transaction || null;
      // Options
      forOwn(query, (value, key) => {
        this[key] = value;
      });
    }
}

export * from './method';
