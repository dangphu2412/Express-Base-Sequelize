import { isArray } from "lodash";

// @ts-check
export class SwaggerNode {
  static instance = {};

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

    if (auth) {
      SwaggerNode.instance.components = {
        schemas: {},
        securitySchemes: {
          bearerAuth: {
              type: 'http',
              scheme: 'bearer',
              bearerFormat: 'JWT',
          },
        },
      };
    }

    return SwaggerNode.instance;
  }

  /**
  * @param {string} name
  */
  static tag(name) {
    if (!SwaggerNode.instance.tags) {
      SwaggerNode.instance.tags = [];
    }
    SwaggerNode.instance.tags.push({
      name,
    });
  }

  /**
   * @param {{ route?: any; method?: any; tags?: any; description?: any; security?: any; }} options
   */
  static declareApi(options) {
    const {
      route,
      method,
      tags,
      description,
      security,
    } = options;

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
    };
  }
}
