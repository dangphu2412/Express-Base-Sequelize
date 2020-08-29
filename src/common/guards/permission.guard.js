// @ts-check
import { isUndefined, find } from 'lodash';
import { Forbidden } from '../../utils/errors';

export class GuardAccess {
  constructor(jwtStrategy) {
    this.strategy = jwtStrategy;
  }

  guardCheck(...scopes) {
    return (req, res, next) => {
      const { user } = req;

      const { permissions } = user.roles;

      const validAccess = find(permissions, (permission) => find(
        scopes, (scope) => {
          const { method, module } = scope;

          if (permission.method === method
            && permission.module === module
          ) return true;

          return false;
        },
      ));

      if (isUndefined(validAccess)) {
        throw new Forbidden();
      }
      return next();
    };
  }
}
