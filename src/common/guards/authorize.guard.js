// @ts-check
import { isEmpty } from 'lodash';
import { UnAuthorized } from '../../utils/errors';
import { JwtStrategy } from '../../utils/strategy';

export class Authorization {
  /**
   * @param {JwtStrategy} jwtStrategy
   */
  constructor(jwtStrategy) {
    this.strategy = jwtStrategy;
  }

  auth(req, res, next) {
    let token = req.headers['x-access-token'] || req.headers['authorization'];
    if (!token) {
        throw new UnAuthorized();
    }

    if (token.startsWith('Bearer ')) {
        // Remove Bearer from string
        token = token.slice(7, token.length);
    }

    const user = this.strategy.decode(token);

    if (isEmpty(user)) {
      throw new UnAuthorized();
    }
    Object.apply(req, user);

    return next();
  }
}
