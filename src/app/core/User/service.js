import { BaseService } from '../../concept/service';
import { UserRepository } from './repository';

class Service extends BaseService {
  constructor() {
    super();
    this.repository = UserRepository;
  }
}

export const UserService = new Service();
