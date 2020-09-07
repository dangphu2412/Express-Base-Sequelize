/* eslint-disable max-len */
// @ts-check
import express from 'express';
import {
 each, toLower, isUndefined, upperFirst,
} from 'lodash';
import { Authorization } from '../../common/guards/authorize.guard';
import { GuardAccess } from '../../common/guards/ACL.guard';
import { logger, removeLast } from '../../utils';
import { SwaggerNode } from '../../libs/swaggerNode';

export class Handler {
  static jwt = new Authorization();

  static acl = new GuardAccess();

  /**
   * @param {{router: any, prefixPath: any}} router
   * @param {[{route: string, method: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE', controller: any, validate?: any, jwt?: boolean, access?: Array, description?: string}]} register
   */
  static registerRoutes({
    router,
    prefixPath,
  }, register) {
    const subRouter = express.Router();

    each(register, control => {
      const handler = [];
      let { route } = control;
      const {
        method,
        controller,
        validate,
        jwt,
        access,
        description,
      } = control;

      if (jwt === true) {
        handler.push(Handler.jwt.auth);
      }

      if (validate) {
        handler.push(validate);
      }

      if (access) {
        handler.push(Handler.acl.guardCheck(access));
      }

      if (route.endsWith('/') && !route.startsWith('/')) {
        route = removeLast(route);
      }

      if (isUndefined(controller)) {
        logger.error(`${method} -> ${route} is missing controller`);
        process.exit(1);
      }

      handler.push(controller);

      subRouter[toLower(method)](route, handler);

      SwaggerNode.tag(Handler.getTag(prefixPath));
      SwaggerNode.declareApi({
        description,
        method: toLower(method),
        route: `${prefixPath}${route}`,
        security: jwt,
        tags: Handler.getTag(prefixPath),
      });
      logger.info(`Mapped ${method} -> ${prefixPath}${route}`);
    });

    router.use(prefixPath, subRouter);
  }

  /**
   * @param {string} prefixRoute
   */
  static getTag(prefixRoute) {
    return upperFirst(prefixRoute.split('/')[1]);
  }
}
