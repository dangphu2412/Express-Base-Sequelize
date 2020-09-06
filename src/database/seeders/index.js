/* eslint-disable import/no-dynamic-require */
import env from 'dotenv';
import { logger } from '../../utils';

env.config();
const _env = process.env.NODE_ENV || 'development';
const seedDirRoot = `./factory/${_env}`;
const SeedInstance = require(seedDirRoot).default;

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const transaction = await queryInterface.sequelize.transaction();
    try {
      console.log(`Getting seed root ${seedDirRoot}`);
      const seeder = new SeedInstance(logger);
      await seeder.start(transaction);
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