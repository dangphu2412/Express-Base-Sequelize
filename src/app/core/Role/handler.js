import { Handler } from '../../concept/handler';
import { RoleController } from './controller';

export class RoleHandler {
  static register(router) {
    const controller = RoleController;
    Handler.registerRoutes(
      {
        router,
        prefixPath: '/roles',
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
