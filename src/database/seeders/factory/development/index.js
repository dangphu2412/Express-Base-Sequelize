import { MethodSeeder, ModuleSeeder, PermissionSeeder, RoleSeeder, UserSeeder } from '../seeders';

export default class SeedDev {
  constructor(logger) {
    this.logger = logger;
  }

  async start(transaction) {
    this.logger.info('Importing Seeders');
    await (new MethodSeeder(this.logger)).start(transaction);
    await (new ModuleSeeder(this.logger)).start(transaction);
    const permissions = await (new PermissionSeeder(this.logger)).start(transaction);
    await (new RoleSeeder(this.logger)).start(transaction, permissions);
    await (new UserSeeder(this.logger)).start(transaction);
  }
}
