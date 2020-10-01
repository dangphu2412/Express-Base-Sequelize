/* eslint-disable max-len */
// @ts-check
import { extractEnumToArray } from '../../utils';

export class SwaggerDocument {
  static type = {
    string: {
      type: 'string',
    },
    int: {
      type: 'integer',
      format: 'int64',
    },
    dateTime: {
      type: 'string',
      format: 'date-time',
    },
    bool: {
      type: 'boolean',
      default: true,
    },
    file: {
      type: 'file',
    },
    array: item => ({
      type: 'array',
      items: {
        $ref: `#/components/schemas/${item}`,
      },
    }),
    enum: enumModel => ({
      type: 'string',
      enum: extractEnumToArray(enumModel),
    }),
    model: dtoModel => ({
      $ref: `#/components/schemas/${dtoModel}`,
    }),
  }

  /**
   * @param {{ type: 'string' | 'int' | 'dateTime' | 'bool' | 'array' | 'enum' | 'model' | {(type: string): any}; model: any; required?: boolean; readOnly?:boolean; description: string; }} options
   */
  static ApiProperty(options) {
    const {
      type,
      model,
      required = true,
      readOnly = false,
      description = 'Example',
    } = options;
    let swaggerType = SwaggerDocument.type[type];
    if (type === 'enum'
    || type === 'model'
    || type === 'array') {
      swaggerType = swaggerType(model);
    }

    return {
      required,
      description,
      readOnly,
      ...swaggerType,
    };
  }

  /**
   * @param {{ name: any; type: 'string' | 'int' | 'dateTime' | 'bool' | 'array' | 'enum' | 'model' | {(type: string): any}; model?:any, paramsIn?: 'query' | 'path'; required?: any; description?: any; }} options
   */
  static ApiParams(options) {
    const {
      type,
      name,
      model,
      paramsIn = 'query',
      required = true,
      description = 'Example',
    } = options;

    let swaggerType = SwaggerDocument.type[type];
    if (type === 'enum'
    || type === 'model'
    || type === 'array') {
      swaggerType = swaggerType(model);
    }
    return {
      name,
      in: paramsIn,
      schema: swaggerType,
      required,
      description,
    };
  }
}
