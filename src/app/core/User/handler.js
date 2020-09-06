import { Handler } from '../../concept/handler';
import { UserController } from './controller';

export class UserHandler {
  static register(router) {
    const controller = UserController;
    Handler.registerRoutes(
      {
        router,
        prefixPath: '/users',
      },
      [
        {
          route: '/',
          method: 'GET',
          controller: controller.findAll.bind(controller),
        },
      ],
    );
  }
}
