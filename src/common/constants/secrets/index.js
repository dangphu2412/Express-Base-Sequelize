import env from 'dotenv';
import { isEmpty } from 'lodash';
import logger from '../../../utils/logger';

env.config();

export const SERVER = {
    HOST: process.env.HOST,
    PORT: process.env.PORT,
};

export const JWT_CONFIG = {
    SECRET_KEY: process.env.SECRET_KEY,
    EXPIRE_DATE: process.env.EXPIRE_DATE,
};

export const SALT_ROUNDS = parseInt(process.env.SALT_ROUNDS, 10);

if (
  isEmpty(SERVER)
  && isEmpty(JWT_CONFIG)
  && isEmpty(SALT_ROUNDS)
) {
  logger.info('Missing secrets in .env ! Please check in \'src/common/constants/secrets \'');
  process.exit(1);
}
