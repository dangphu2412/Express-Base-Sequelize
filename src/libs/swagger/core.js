/* eslint-disable max-len */
import { some, isArray } from 'lodash';
import httpStatus from 'http-status';
import { ERROR } from '../../common/constants';

// @ts-check
export class SwaggerNode {
  static instance = {};

  static errors = SwaggerNode.getErrors();

  static config(options) {
    const {
      openapi,
      info,
      servers,
      auth,
      basePath,
    } = options;

    SwaggerNode.instance.openapi = openapi;
    SwaggerNode.instance.info = info;
    SwaggerNode.instance.servers = servers;
    SwaggerNode.instance.basePath = basePath;
    SwaggerNode.initAuth(auth);

    return SwaggerNode.instance;
  }

  /**
  * @param {string} name
  */
  static tag(name) {
    if (!SwaggerNode.instance.tags) {
      SwaggerNode.instance.tags = [];
    }
    const isTagExisted = some(SwaggerNode.instance.tags, item => item.name === name);

    if (isTagExisted === false) {
      SwaggerNode.instance.tags.push({
        name,
      });
    }
  }

  /**
   * @param {{ route?: any; method?: any; tags?: any; description?: any; security?: any; model?: string, body?:any, params?:any;consumes?:any }} options
   */
  static declareApi(options) {
    const {
      route,
      method,
      tags,
      description,
      security,
      model,
      body,
      params = [],
      consumes = [],
    } = options;
    const responses = SwaggerNode.errors;

    if (!SwaggerNode.instance.paths) {
      SwaggerNode.instance.paths = {};
    }

    if (!SwaggerNode.instance.paths[route]) {
      SwaggerNode.instance.paths[route] = {};
    }

    SwaggerNode.instance.paths[route][method] = {
      tags: isArray(tags) ? tags : [tags],
      description,
      security: security ? [
        {
            bearerAuth: [],
        },
      ] : [],
      produces: [
        'application/json',
      ],
      consumes,
      parameters: params,
      requestBody: body ? {
        content: {
          'application/json': {
            schema: {
              $ref: `#/components/schemas/${body}`,
            },
          },
        },
        required: true,
      } : {},
      responses: {
        ...responses,
        ...SwaggerNode.getResponseSuccess(model),
      },
    };
  }

  static declareModel(dtoName, properties) {
    if (!SwaggerNode.instance.components) {
      SwaggerNode.instance.components = {
        schemas: {},
      };
    }
    SwaggerNode.instance.components.schemas[dtoName] = {
      type: 'object',
      properties,
    };
  }

  static declareParams(route) {
    const params = [];
    route.split('/').forEach(el => {
      if (el.startsWith(':')) {
       const pattern = el.split(':')[1];
       params.push({
         name: pattern,
         in: 'path',
         schema: {
           type: 'integer',
           format: 'int64',
         },
         required: true,
         description: 'Required id',
       });
      }
    });
    return params;
  }

  static getErrors() {
    const responses = {};

    Object.keys(ERROR).forEach(key => {
      responses[httpStatus[key]] = {
        description: ERROR[key],
      };
    });

    return responses;
  }

  static getResponseSuccess(model) {
    return {
      200: {
        description: 'successful operation',
        content: {
          'application/json': {
            schema: {
              type: 'array',
              items: {
                $ref: `#/components/schemas/${model}`,
              },
            },
          },
        },
      },
    };
  }

  static initAuth(auth) {
    if (auth) {
      const security = 'securitySchemes';
      SwaggerNode.instance.components[security] = {
          bearerAuth: {
              type: 'http',
              scheme: 'bearer',
              bearerFormat: 'JWT',
          },
      };
    }
  }
}
