import { BaseController } from '../../concept/controller';
import { AuthService } from './service';

class Controller extends BaseController {
  constructor() {
    super();
    this.service = AuthService;
  }
}

export const AuthController = new Controller();
