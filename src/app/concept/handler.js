/* eslint-disable max-len */
// @ts-check
import express from 'express';
import {
 each, toLower, isUndefined, isArray,
} from 'lodash';
import { OK } from 'http-status';
import { Authorization } from '../../common/guards/authorize.guard';
import { GuardAccess } from '../../common/guards/ACL.guard';
import { logger } from '../../utils';
import { SwaggerNode } from '../../libs/swagger';

export class Handler {
  static authService = new Authorization();

  static acl = new GuardAccess();

  /**
   * @param {{router: any, prefixPath: any, tag: string}} router
   * @param {[{route: string, method: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE', controller: any, validate?: any, jwt?: boolean, grant?: [{ method: string, module: string}], description?: string, options?: [], model?: string; body?:any, params?:[]; autoGenParamsPath?: boolean; consumes?:['multipart/form-data']}]} register
   */
  static registerRoutes({
    router,
    prefixPath,
    tag,
  }, register) {
    const subRouter = express.Router();

    each(register, control => {
      const handler = [];
      const {
        route,
        method,
        jwt,
        description,
        options,
        model,
        body,
        params,
        autoGenParamsPath = true,
        consumes = [],
      } = control;
      const fullRoute = prefixPath === '/' ? route : `${prefixPath}${route}`;
      const cleanedParams = Handler.clearParams(params, fullRoute, autoGenParamsPath);
      Handler.validateAuthMiddleware(control, handler);
      Handler.addOptionsToHandler(handler, options);
      Handler.controllerToHandler(control, handler, fullRoute);
      Handler.createApi(subRouter, route, method, handler);

      SwaggerNode.tag(tag);
      SwaggerNode.declareApi({
        description,
        method: toLower(method),
        route: Handler.cleanRouteToSwagger(fullRoute),
        security: jwt,
        tags: tag,
        model,
        body,
        params: cleanedParams,
        consumes,
      });
      logger.info(`Mapped ${method} -> ${fullRoute}`);
    });

    router.use(prefixPath, subRouter);
  }

  /**
   * @param {{route: string, method: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE', controller: any, validate?: any, jwt?: boolean, grant?: [{ method: string, module: string}], description?: string}} control
   * @param {any[]} handler
   */
  static validateAuthMiddleware(control, handler) {
    const {
      jwt, validate, grant,
    } = control;

    if (jwt) {
      handler.push(Handler.authService.auth.bind(Handler.authService));
    }

    if (validate) {
      handler.push(validate);
    }

    if (grant) {
      handler.push(Handler.acl.guardCheck(grant));
    }
  }

  /**
   * @param {import("express-serve-static-core").Router} subRouter
   * @param {string} route
   * @param {string} method
   * @param {any[]} handler
   */
  static createApi(subRouter, route, method, handler) {
    subRouter[toLower(method)](route, handler);
  }

  static addOptionsToHandler(handler, options) {
    if (isArray(options)) {
      each(options, option => handler.push(option));
    }
  }

  static controllerToHandler(control, handler, fullRoute) {
    const { controller } = control;
    if (isUndefined(controller)) {
      logger.error(`${fullRoute} is missing controller`);
      process.exit(1);
    }
    handler.push(Handler.getController(controller));
  }

  static getController(controller) {
    return async (request, response, next) => {
      try {
        const data = await controller(request);
        return response.status(OK).json({
          status: OK,
          data,
        });
      } catch (err) {
        return next(err);
      }
    };
  }

  static cleanRouteToSwagger(route) {
    return route.split('/').map(el => {
      if (el.startsWith(':')) {
        return `${el.replace(':', '{')}}`;
      }
      return el;
    }).join('/');
  }

  static clearParams(params, fullRoute, autoSignal) {
    const autoGenParams = autoSignal ? SwaggerNode.declareParams(fullRoute) : [];

    if (isUndefined(params)) {
      return autoGenParams;
    }

    return [...params, ...autoGenParams];
  }
}
