import { BaseController } from '../../concept/controller';
import { UserService } from './service';

class Controller extends BaseController {
  constructor() {
    super();
    this.service = UserService;
  }
}

export const UserController = new Controller();
