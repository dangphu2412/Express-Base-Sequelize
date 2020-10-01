// @ts-check

export class BaseController {
  service;

  getCurrentUser(req) {
    if (!req.user) return { id: undefined };
    const currentUser = req.user;
    currentUser.id = parseInt(currentUser.id, 10);
    return currentUser;
  }

  findAndCountAll(req) {
    const { query } = req;
    return this.service.findAndCountAll(query);
  }

  findAll(req) {
    const { query } = req;
    return this.service.findAll(query);
  }

  createOne(DtoModel, relations) {
    return req => {
      const dto = new DtoModel(req.body);
      return this.service.createOne(dto, relations);
    };
  }

  updateOne(DtoModel, relations) {
    return req => {
      const dto = new DtoModel(req.body);
      return this.service.updateOne(dto, relations);
    };
  }

  async softDelete(req) {
      const { id } = req.query;
      return this.service.softDelete(id);
  }
}
