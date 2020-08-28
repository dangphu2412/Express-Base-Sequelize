import { Sequelize as DatabaseInstance, DataTypes } from 'sequelize';
import loadingConfig from '../../config/database';

import ExampleModel from './example';

const _env = process.env.NODE_ENV || 'development';
const config = loadingConfig[_env];
const models = {};

export const sequelize = new DatabaseInstance(
  config.database,
  config.username,
  config.password,
  config,
);

models.Example = ExampleModel(sequelize, DataTypes);

Object.keys(models).forEach((modelName) => {
  if (models[modelName].associate) {
    models[modelName].associate(models);
  }
});

export default sequelize;

export const Models = models;

export const Sequelize = DatabaseInstance;
