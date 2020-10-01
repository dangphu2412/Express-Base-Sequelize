/* eslint-disable no-unused-vars */
// @ts-check
import { INTERNAL_SERVER_ERROR } from 'http-status';
import { HttpError } from './http.error';
import { SqlError } from '../../common/constants/enums';
import { ERROR } from '../../common/constants/messages';
import { logger } from '../logger';

export const databaseErrorHelper = (err, customErrorInstance = ERROR) => {
  let message = '';
  switch (parseInt(err?.parent?.code, 10)) {
    case SqlError.ALREADY_EXIST:
      message = customErrorInstance.CONFLICT;
      break;
    case SqlError.VIOLATE_FOREIGN_KEY_CONSTRAINT:
      message = customErrorInstance.CONFLICT_FOREIGN;
      break;
    default:
      return message;
  }
  return message;
};

export const errorHandler = (err, req, res, next) => {
  if (err instanceof HttpError) {
    return res.status(err.code).json({
      status: err.code,
      message: err.message,
    });
  }
  logger.error(err);
  return res.status(INTERNAL_SERVER_ERROR).json({
    status: INTERNAL_SERVER_ERROR,
    message: err.message,
  });
};

export * from './badRequest.error';
export * from './notFound.error';
export * from './unAuthorize.error';
export * from './forbidden.error';
export * from './conflict.error';
