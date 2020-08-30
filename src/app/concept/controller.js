// @ts-check
import { OK } from 'http-status';

export class BaseController {
  service;

  async getMany(req, res) {
    const { query } = req;
    const data = await this.service.getMany(query);
    return res.status(OK).json(data);
  }

  createOne(DtoModel, relations) {
    return async (req, res) => {
      const dto = new DtoModel();
      const data = await this.service.createOne(dto, relations);
      return res.status(OK).json(data);
    };
  }
}
