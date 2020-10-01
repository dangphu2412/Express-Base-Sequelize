/* eslint-disable max-len */
// @ts-check
import { forOwn } from 'lodash';
import { FILTER } from '../../common/constants';

export class SequelizeFilter {
  /**
   * @param {{ amount?: number; conditions?: any; page?: number; order?: any; transaction?: any; exlucde?: any; key?: any; value?: any; }} query
   * @param {any} [options]
   */
    constructor(query, options = undefined) {
      this.queryBuilder = {};
      this.createQueryBuilder(query, options);
      this.createPair(query);
    }

    /**
    * @return {{ amount?: number; where?: any; page?: number; order?: any; transaction?: any; attributes?: { exclude: any }; key?: any; value?: any; }} query
    */
    get filter() {
      return this.queryBuilder;
    }

    /**
    * @return {{ amount?: number; where?: any; page?: number; order?: any; transaction?: any; attributes?: { exclude: any }; key?: any; value?: any; }} query
    */
    set filter(value) {
      this.queryBuilder = value;
    }

    /**
     * @return {{ key: string, value: any }}
     */
    get pair() {
      return this.selector;
    }

    /**
    * @return {{ key: string, value: any } | null} value
    */
    set pair(value) {
     this.selector = value;
    }

  /**
   * @param {{ amount?: number; conditions?: any; page?: number; order?: any; transaction?: any; exlucde?: any; key?: any; value?: any; }} query
   * @param {any} options
   */
    createQueryBuilder(query, options) {
      const page = query.page || FILTER.PAGE;
      const amount = query.amount || FILTER.AMOUNT;
      /* findOptions sequelize not receive class instance
      *  So save as an object in this.queryBuilder
      */
      this.queryBuilder.offset = (page - 1) * amount;
      this.queryBuilder.limit = amount;
      this.queryBuilder.order = query.order || undefined;
      this.queryBuilder.where = query.conditions || {};
      this.queryBuilder.tracsaction = query.transaction || undefined;
      if (query.exlucde) {
        this.queryBuilder.attributes.exclude = query.exlucde;
      }

      if (options) {
      // Options
        forOwn(query, (value, key) => {
          this.queryBuilder[key] = value;
        });
      }
    }

  /**
   * @param {{ amount?: number; conditions?: any; page?: number; order?: any; transaction?: any; exlucde?: any; key?: any; value?: any; }} query
   */
    createPair(query) {
      this.selector = {
        key: query.key,
        value: query.value,
      };
    }
}
