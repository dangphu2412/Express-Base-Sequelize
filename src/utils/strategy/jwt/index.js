// @ts-check
import jwt from 'jsonwebtoken';
import { JWT_CONFIG } from '../../../common/constants';

class Strategy {
  constructor() {
    this.jwt = jwt;
    this.secrect = JWT_CONFIG.SECRET_KEY;
    this.expiresIn = JWT_CONFIG.EXPIRE_DATE;
  }

  sign({
    payload,
    expiresIn = this.expiresIn,
  }) {
    return this.jwt.sign(
      payload,
      this.secrect,
      {
        expiresIn,
      },
    );
  }

  /**
   * @param {string} token
   */
  decode(token) {
    return this.jwt.decode(token);
  }
}

export const JwtStrategy = new Strategy();
