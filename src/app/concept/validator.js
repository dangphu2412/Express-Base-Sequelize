/* eslint-disable max-len */
// @ts-check
import { checkSchema, validationResult } from 'express-validator';
import { BadRequest } from '../../utils';
import { BAD_INPUT } from '../../common/constants';

export class ClassValidator {
    /**
     * @param {Record<string, import("express-validator").ParamSchema>} objectValidator
     */
    start(objectValidator) {
        return [
            checkSchema(objectValidator),
            this.catchErrors,
        ];
    }

    catchErrors(request, response, next) {
        try {
            if (validationResult(request).isEmpty()) {
                return next();
            }
            validationResult(request).throw();
        } catch (error) {
            const message = `${error.errors[0].msg}`;
            throw new BadRequest(message);
        }
    }

    /**
     * @return {import("express-validator").ParamSchema} param object validator
     * @param {{ inRequest: ["body" | "cookies" | "headers" | "params" | "query"]; field: any; exists?: true; options?: import("express-validator").ParamSchema; }} paramSchema
     */
    isInt(paramSchema) {
        const {
            inRequest,
            field,
            exists = true,
            options,
        } = paramSchema;

        return {
            in: inRequest,
            errorMessage: BAD_INPUT.NUMBER(field),
            isInt: true,
            exists,
            ...options,
        };
    }

    /**
     * @return {import("express-validator").ParamSchema} param object validator
     * @param {{ inRequest: ["body" | "cookies" | "headers" | "params" | "query"]; field: any; exists?: true; options?: import("express-validator").ParamSchema; }} paramSchema
     */
    isEmail(paramSchema) {
        const {
            inRequest,
            field,
            exists = true,
            options,
        } = paramSchema;

        return {
            in: inRequest,
            errorMessage: BAD_INPUT.EMAIL(field),
            isEmail: true,
            exists,
            trim: true,
            ...options,
        };
    }

    /**
     * @return {import("express-validator").ParamSchema} param object validator
     * @param {{ inRequest: ["body" | "cookies" | "headers" | "params" | "query"]; field: any; exists?: true; options?: import("express-validator").ParamSchema; min: number; max: number}} paramSchema
     */
    matchLength(paramSchema) {
        const {
            inRequest,
            field,
            min,
            max,
            exists = true,
            options,
        } = paramSchema;

        return {
            in: inRequest,
            errorMessage: BAD_INPUT.EMPTY(field),
            isEmail: true,
            exists,
            trim: true,
            isLength: {
                errorMessage: BAD_INPUT.LENTGH(field, { min, max }),
                options: { max, min },
            },
            ...options,
        };
    }

        /**
     * @return {import("express-validator").ParamSchema} param object validator
     * @param {{ inRequest: ["body" | "cookies" | "headers" | "params" | "query"]; field: any; exists?: true; options?: import("express-validator").ParamSchema;}} paramSchema
     */
    isExist(paramSchema) {
        const {
            inRequest,
            field,
            options,
        } = paramSchema;
        return {
            in: [...inRequest],
            errorMessage: BAD_INPUT.EMPTY(field),
            exists: true,
            trim: true,
            ...options,
        };
    }

    /**
     * @return {import("express-validator").ParamSchema} param object validator
     * @param {{ inRequest: ["body" | "cookies" | "headers" | "params" | "query"]; field: any; exists?: true; options?: import("express-validator").ParamSchema;}} paramSchema
     */
    isArray(paramSchema) {
        const {
            inRequest,
            field,
            options,
        } = paramSchema;
        return {
            in: [...inRequest],
            errorMessage: BAD_INPUT.EMPTY(field),
            exists: true,
            isArray: true,
            ...options,
        };
    }
}
