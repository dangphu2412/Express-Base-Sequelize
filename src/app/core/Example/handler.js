import { Handler } from '../../concept/handler';
import { ExampleController } from './controller';

export class ExampleHandler {
  static register(router) {
    const controller = new ExampleController();
    Handler.registerRoutes(
      {
        router,
        prefixPath: '/example',
      },
      [
        {
          route: '/test',
          method: 'GET',
          controller: controller.getMany.bind(controller),
        },
      ],
    );
  }
}
