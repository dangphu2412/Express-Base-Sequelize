import { Model } from 'sequelize';

export default (sequelize, DataTypes) => {
  class Method extends Model {
    static associate(models) {
      Method.hasMany(models.Permission);
    }
  }

  Method.init({
    name: DataTypes.STRING,
  }, {
    paranoid: false,
    timestamps: false,
    sequelize,
    modelName: 'method',
  });
  return Method;
};
