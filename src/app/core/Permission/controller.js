import { BaseController } from '../../concept/controller';
import { PermissionService } from './service';

class Controller extends BaseController {
  constructor() {
    super();
    this.service = PermissionService;
  }
}

export const PermissionController = new Controller();
