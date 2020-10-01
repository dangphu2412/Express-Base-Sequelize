// @ts-check
import { isEmpty } from 'lodash';
import { UnAuthorized, JwtStrategy, OauthStrategy } from '../../utils';

export class Authorization {
  constructor() {
    this.strategy = JwtStrategy;
    this.oauthStrategy = OauthStrategy;
  }

  auth(req, res, next) {
    let token = this._getToken(req);
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

    req.user = user;

    return next();
  }

  authNotRequired(req, res, next) {
    let token = this._getToken(req);
    if (token) {
        if (token.startsWith('Bearer ')) {
            // Remove Bearer from string
            token = token.slice(7, token.length);
        }
        const user = this.strategy.decode(token);

        if (isEmpty(user)) {
          throw new UnAuthorized();
        }

        req.user = user;
    }
    return next();
  }

  async oauth(req, res, next) {
    const oAuthToken = this._getOauthToken(req);

    const user = await this.oauthStrategy.verify(oAuthToken);

    if (!user) {
        throw new UnAuthorized('Đăng nhập gặp vấn đề gì rồi !');
    }

    req.user = user;

    return next();
  }

  _getToken(req) {
    return req.headers['authorization'] || req.headers['x-access-token'];
  }

  _getOauthToken(req) {
    return req.headers['x-access-oauth'];
  }
}
