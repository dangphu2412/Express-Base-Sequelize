// @ts-check
import { camelCase, map } from 'lodash';
 /**
 * @param {string} methodScope
 * @param {any} input
 */
export const extractToMethodScope = (methodScope, input) => ({
    method: [methodScope, input],
});

export const addMany = (sourceDto, relations) => Promise.all(
    map(relations, (value) => {
        const key = `${camelCase(value)}Ids`;
        const ids = sourceDto[key];
        return sourceDto[`add${camelCase(value)}s`](ids);
    }),
);
