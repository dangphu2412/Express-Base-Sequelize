// @ts-check
import {
 camelCase, upperFirst, map, last,
} from 'lodash';
 /**
 * @param {string} methodScope
 * @param {any} input
 */
export const extractToMethodScope = (methodScope, input) => ({
    method: [methodScope, input],
});

export const endWith = (src, val) => (last(src) === val);

export const mapKeyUpdate = dto => Object.keys(dto).map(key => key);

export const removeLast = src => src.substring(0, src.length - 1);

export const addMany = (sourceDto, relations, transaction = null) => Promise.all(
    map(relations, value => {
        let relation = value;
        if (endWith(relation, 's')) {
            relation = removeLast(value);
        }
        relation = camelCase(relation);

        const key = `${relation}Ids`;

        const ids = sourceDto[key];
        const methodToMany = `add${upperFirst(relation)}s`;

        return sourceDto[methodToMany](ids, { transaction });
    }),
);

export const setMany = (sourceDto, relations, transaction = null) => Promise.all(
    map(relations, value => {
        let relation = value;
        if (endWith(relation, 's')) {
            relation = removeLast(value);
        }
        relation = camelCase(relation);

        const key = `${relation}Ids`;

        const ids = sourceDto[key];
        const methodToMany = `set${upperFirst(relation)}s`;

        return sourceDto[methodToMany](ids, { transaction });
    }),
);
