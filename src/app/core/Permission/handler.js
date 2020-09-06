import { Handler } from '../../concept/handler';
import { PermissionController } from './controller';

export class PermissionHandler {
  static register(router) {
    const controller = PermissionController;
    Handler.registerRoutes(
      {
        router,
        prefixPath: '/permissions',
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
