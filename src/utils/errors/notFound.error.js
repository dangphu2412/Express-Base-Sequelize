import { NOT_FOUND } from 'http-status';
import { HttpError } from './http.error';
import { errorMessage } from '../../common/constants/messages';

export class NotFound extends HttpError {
  constructor(message = errorMessage.NOT_FOUND) {
    super(message, NOT_FOUND);
  }
}
