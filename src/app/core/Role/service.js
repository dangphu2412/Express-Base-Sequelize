import { BaseService } from '../../concept/service';
import { RoleRepository } from './repository';

class Service extends BaseService {
  constructor() {
    super();
    this.repository = RoleRepository;
  }
}

export const RoleService = new Service();
