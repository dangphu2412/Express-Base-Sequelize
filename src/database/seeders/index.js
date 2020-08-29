module.exports = {
  up: async (queryInterface, Sequelize) => {
    const transaction = await queryInterface.sequelize.transaction();
    try {
      // await seedingUser.start(transaction, roleIds);

      await transaction.commit();
    } catch (error) {
      console.log(error);
      await transaction.rollback();
      throw error;
    }
  },

  down: async (queryInterface, Sequelize) => {
    const transaction = await queryInterface.sequelize.transaction();
    try {
      // await seedingUser.stop(transaction, roleIds);

      await transaction.commit();
    } catch (error) {
      console.log(error);
      await transaction.rollback();
      throw error;
    }
  }
};