import { BaseController } from '../../concept/controller';
import { RoleService } from './service';

class Controller extends BaseController {
  constructor() {
    super();
    this.service = RoleService;
  }
}

export const RoleController = new Controller();
