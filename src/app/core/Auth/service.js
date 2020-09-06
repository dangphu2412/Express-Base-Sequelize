import { BaseService } from '../../concept/service';
import { UserRepository } from '../User/repository';

class Service extends BaseService {
  constructor() {
    super();
    this.repository = UserRepository;
  }
}

export const AuthService = new Service();
