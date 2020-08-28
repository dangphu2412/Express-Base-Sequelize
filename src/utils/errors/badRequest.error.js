import { BAD_REQUEST } from 'http-status';
import { HttpError } from './http.error';

// eslint-disable-next-line import/prefer-default-export
export class BadRequest extends HttpError {
  constructor(message) {
    super();
    this.message = message;
    this.code = BAD_REQUEST;
  }
}
