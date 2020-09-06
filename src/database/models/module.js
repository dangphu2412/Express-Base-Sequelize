import { Model } from 'sequelize';

export default (sequelize, DataTypes) => {
  class Module extends Model {
    static associate(models) {
      Module.hasMany(models.Permission);
    }
  }

  Module.init({
    name: DataTypes.STRING,
  }, {
    paranoid: false,
    timestamps: false,
    sequelize,
    modelName: 'module',
  });
  return Module;
};
