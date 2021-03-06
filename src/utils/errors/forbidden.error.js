import { FORBIDDEN } from 'http-status';
import { HttpError } from './http.error';
import { errorMessage } from '../../common/constants';

export class Forbidden extends HttpError {
  constructor(message = errorMessage.FORBIDDEN) {
    super(message, FORBIDDEN);
  }
}
