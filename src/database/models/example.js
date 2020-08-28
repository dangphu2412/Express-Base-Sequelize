import { Model } from 'sequelize';

export default (sequelize, DataTypes) => {
  class Example extends Model {
    static associate(models) {
    }
  }
  Example.init({

  }, {
    sequelize,
    modelName: 'Example',
  });
  return Example;
};
