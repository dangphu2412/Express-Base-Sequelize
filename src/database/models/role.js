import { Model } from 'sequelize';

export default (sequelize, DataTypes) => {
  class Role extends Model {
    static associate(models) {
      Role.belongsToMany(models.Permission,
      {
        through: 'role_permissions',
        timestamps: false,
      });
      Role.hasMany(models.User);
    }
  }

  Role.init({
    name: DataTypes.STRING,
    description: DataTypes.STRING,
  }, {
    paranoid: true,
    sequelize,
    modelName: 'role',
  });
  return Role;
};
