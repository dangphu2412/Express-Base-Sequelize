import { CONFLICT } from 'http-status';
import { HttpError } from './http.error';
import { ERROR } from '../../common/constants';

export class Conflict extends HttpError {
  constructor(message = ERROR.CONFLICT) {
    super(message, CONFLICT);
  }
}
