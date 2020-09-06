import { Handler } from '../../concept/handler';
import { AuthController } from './controller';

export class AuthHandler {
  static register(router) {
    const controller = AuthController;
    Handler.registerRoutes(
      {
        router,
        prefixPath: '/auth',
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
