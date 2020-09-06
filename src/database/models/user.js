import { Model } from 'sequelize';

export default (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      User.belongsTo(models.Role);
    }
  }

  User.init({
    name: DataTypes.STRING,
    password: DataTypes.STRING,
    status: DataTypes.STRING(10),
  }, {
    paranoid: true,
    sequelize,
    modelName: 'user',
  });
  return User;
};
