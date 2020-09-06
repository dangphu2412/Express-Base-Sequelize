import { Sequelize as DatabaseInstance, DataTypes } from 'sequelize';
import loadingConfig from '../../config/database';

import Method from './method';
import Module from './module';
import Permission from './permission';
import Role from './role';
import User from './user';

const _env = process.env.NODE_ENV || 'development';
const config = loadingConfig[_env];
const models = {};

export const sequelize = new DatabaseInstance(
  config.database,
  config.username,
  config.password,
  config,
);

models.Method = Method(sequelize, DataTypes);
models.Module = Module(sequelize, DataTypes);
models.Permission = Permission(sequelize, DataTypes);
models.Role = Role(sequelize, DataTypes);
models.User = User(sequelize, DataTypes);

Object.keys(models).forEach(modelName => {
  if (models[modelName].associate) {
    models[modelName].associate(models);
  }
});

export default sequelize;

export const Models = models;

export const Sequelize = DatabaseInstance;
