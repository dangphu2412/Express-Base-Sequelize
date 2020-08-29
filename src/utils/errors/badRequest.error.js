import { BAD_REQUEST } from 'http-status';
import { HttpError } from './http.error';
import { errorMessage } from '../../common/constants/messages';

export class BadRequest extends HttpError {
  constructor(message = errorMessage.BAD_REQUEST) {
    super(message, BAD_REQUEST);
  }
}
