import { Model } from 'sequelize';

export default (sequelize, DataTypes) => {
  class Permission extends Model {
    static associate(models) {
      Permission.belongsTo(models.Method);
      Permission.belongsTo(models.Module);

      Permission.belongsToMany(models.Role, {
        through: 'role_permissions',
        timestamps: false,
      });
    }
  }

  Permission.init({
    name: DataTypes.STRING,
  }, {
    paranoid: true,
    sequelize,
    modelName: 'permission',
  });
  return Permission;
};
