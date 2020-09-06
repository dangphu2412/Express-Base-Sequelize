import bcrypt from 'bcrypt';
import { SALT_ROUNDS } from '../../common/constants';

class Bcrypt {
  constructor() {
    this.instance = bcrypt;
    this.saltRounds = SALT_ROUNDS;
  }

  /**
   * @param {any} data
   */
  hashSync(data) {
    const salt = this.instance.genSaltSync(this.saltRounds);
    return this.instance.hashSync(data, salt);
  }

  /**
   * @param {any} toBeEncrypted
   * - This data come from database which has been hashed
   * @param {string} compareData
   * - This data come from body which is sent by user
   */
  compareSync(toBeEncrypted, compareData) {
    return this.instance.compareSync(toBeEncrypted, compareData);
  }
}

export const bcryptService = new Bcrypt();
