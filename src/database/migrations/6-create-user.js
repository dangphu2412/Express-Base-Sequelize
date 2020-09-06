const { UserStatus } = require('../../common/constants');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('users', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      name: {
        type: Sequelize.STRING,
      },
      password: {
        type: Sequelize.STRING,
      },
      status: {
        type: Sequelize.STRING(10),
        defaultValue: UserStatus.ACTIVATED,
      },
      roleId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'roles',
          key: 'id',
        },
        onUpdate: 'CASCADE',
      },
      // ...
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW,
      },
      deletedAt: {
        defaultValue: null,
        type: Sequelize.DATE,
      },
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('users');
  },
};
