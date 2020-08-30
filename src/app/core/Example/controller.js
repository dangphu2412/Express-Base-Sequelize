import { OK } from 'http-status';
import { ExampleService } from './service';

export class ExampleController {
  constructor() {
    this.service = new ExampleService();
  }
}
