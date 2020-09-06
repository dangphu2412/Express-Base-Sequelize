/* eslint-disable max-len */
// @ts-check
import express from 'express';
import { each, toLower, isUndefined } from 'lodash';
import { Authorization } from '../../common/guards/authorize.guard';
import { GuardAccess } from '../../common/guards/ACL.guard';
import { logger } from '../../utils';

export class Handler {
  static jwt = new Authorization();

  static acl = new GuardAccess();

  /**
   * @param {{router: any, prefixPath: any}} router
   * @param {[{route: string, method: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE', controller: any, validate: any, jwt: boolean, access: Array}]} register
   */
  static registerRoutes({
    router,
    prefixPath,
  }, register) {
    const subRouter = express.Router();
    each(register, control => {
      const handler = [];
      const {
        route,
        method,
        controller,
        validate,
        jwt,
        access,
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

      if (isUndefined(controller)) {
        logger.error(`${method} -> ${route} is missing controller`);
        process.exit(1);
      }

      handler.push(controller);

      subRouter[toLower(method)](route, handler);

      logger.info(`Mapped ${method} -> ${prefixPath}${route}`);
    });

    router.use(prefixPath, subRouter);
  }
}
