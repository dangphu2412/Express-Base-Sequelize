// @ts-check
import { map } from 'lodash';

/**
 * @param {any} dto
 * @param {[{ key: string, value: any }]} foreigns
 */
export const mapForeignKeyToDto = (dto, foreigns) => (
  map(foreigns, foreign => {
    // eslint-disable-next-line no-param-reassign
    dto[foreign.key] = foreign.value;
    return dto;
  })
);

export const fromDtosToIds = dtos => map(dtos, dto => dto.id);

/**
 *
 * @param {any} model instance of model
 * @param {string} alias alias to be returned
 * @param {import('sequelize').IncludeOptions} includeOptions - include optionals
 * @param {[] | string} scope - scope to assign
 * @return {import('sequelize').FindOptions}
 */
export const assignRelationScope = (model, alias, includeOptions, scope = 'defaultScope') => ({
  include: [{
    model: model.scope(scope),
    as: alias,
    ...includeOptions,
  }],
});
