module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('role_permissions', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      roleId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'roles',
          key: 'id',
        },
        onUpdate: 'CASCADE',
      },
      permissionId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'permissions',
          key: 'id',
        },
        onUpdate: 'CASCADE',
      },
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('role_permissions');
  },
};
