import { BaseService } from '../../concept/service';
import { PermissionRepository } from './repository';

class Service extends BaseService {
  constructor() {
    super();
    this.repository = PermissionRepository;
  }
}

export const PermissionService = new Service();
