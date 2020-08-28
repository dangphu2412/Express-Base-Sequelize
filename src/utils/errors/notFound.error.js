import { NOT_FOUND } from 'http-status';
import { HttpError } from './http.error';

// eslint-disable-next-line import/prefer-default-export
export class NotFound extends HttpError {
  constructor(message) {
    super();
    this.message = message;
    this.code = NOT_FOUND;
  }
}
