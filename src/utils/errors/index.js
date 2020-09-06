// @ts-check
import { INTERNAL_SERVER_ERROR } from 'http-status';
import { HttpError } from './http.error';

export const errorHandler = (err, req, res, next) => {
  if (err instanceof HttpError) {
    return res.status(err.code).json({
      status: err.code,
      message: err.message,
    });
  }

  return res.status(INTERNAL_SERVER_ERROR).json({
    status: INTERNAL_SERVER_ERROR,
    message: err.message,
  });
};

export * from './badRequest.error';

export * from './notFound.error';

export * from './unAuthorize.error';

export * from './forbidden.error';
