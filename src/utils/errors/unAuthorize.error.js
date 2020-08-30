import { UNAUTHORIZED } from 'http-status';
import { HttpError } from './http.error';
import { errorMessage } from '../../common/constants';

export class UnAuthorized extends HttpError {
  constructor(message = errorMessage.UNAUTHORIZED) {
    super(message, UNAUTHORIZED);
  }
}
