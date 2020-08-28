import { INTERNAL_SERVER_ERROR } from 'http-status';
import { HttpError } from './http.error';

export const errorHandler = (err, req, res, next) => {
  console.log(err);
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