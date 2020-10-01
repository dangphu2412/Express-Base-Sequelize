/* eslint-disable no-console */
import 'dotenv/config';
import { isEmpty } from 'lodash';

export const SERVER = {
    HOST: process.env.HOST,
    PORT: process.env.PORT,
    FRONT_HOST: process.env.FRONT_HOST,
};

export const JWT_CONFIG = {
    SECRET_KEY: process.env.SECRET_KEY,
    EXPIRE_DATE: process.env.EXPIRE_DATE,
};

export const GOOGLE_CRED = {
    GG_CLIENT_ID: process.env.GG_CLIENT_ID,
    GG_CLIENT_SECRECT: process.env.GG_CLIENT_SECRECT,
};

export const MAIL_CONFIG = {
    api_user: process.env.EMAIL_ACCOUNT,
    api_key: process.env.EMAIL_PASSWORD,
};

export const CLOUDINARY_CONFIG = {
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUD_API_KEY,
    api_secret: process.env.CLOUD_API_SECRET,
    enhance_image_tag: true,
    static_file_support: false,
};

export const SHEET_CONFIG = {
  Question: {
    spreadsheetId: '16ZCK_8mhutqkEMO65bybmJbSSgNY9Px6v6X0ytd2AAg',
    sheetName: 'Question',
  },
  Feedback: {
    spreadsheetId: '1QBAwTP_nvGEZXJgSjWOkmxiBNpDWCd-Mwc4ac7fZuCw',
    sheetName: 'Feedback',
  },
};

export const FOLDER_CLOUD = process.env.NODE_ENV === 'production' ? 'gallery' : 'test';

export const SALT_ROUNDS = process.env.SALT_ROUNDS || 10;

export class Secret {
  constructor() {
    console.log('Initialize secrets');
  }

  init() {
    if (
      isEmpty(SERVER)
      && isEmpty(JWT_CONFIG)
      && isEmpty(GOOGLE_CRED)
      && isEmpty(MAIL_CONFIG)
      && isEmpty(CLOUDINARY_CONFIG)
      && isEmpty(SHEET_CONFIG)
      && isEmpty(SALT_ROUNDS)
    ) {
      console.log('Missing secrets in .env ! Please check in \'src/common/constants/secrets \'');
      process.exit(1);
    }
  }
}
