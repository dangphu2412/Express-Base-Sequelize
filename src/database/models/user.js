import { Model } from 'sequelize';

export default (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {

    }
  }

  User.init({
    name: DataTypes.STRING,
    password: DataTypes.STRING,
  }, {
    paranoid: true,
    sequelize,
    modelName: 'user',
  });
  return User;
};
