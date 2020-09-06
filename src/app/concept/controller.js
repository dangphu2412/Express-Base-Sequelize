// @ts-check
import { OK } from 'http-status';

export class BaseController {
  service;

  async findAndCountAll(req, res) {
    const { query } = req;
    const data = await this.service.findAndCountAll(query);
    return res.status(OK).json(data);
  }

  async findAll(req, res) {
    const { query } = req;
    const data = await this.service.findAll(query);
    return res.status(OK).json(data);
  }

  createOne(DtoModel, relations) {
    return async (req, res) => {
      const dto = new DtoModel(req.body);
      const data = await this.service.createOne(dto, relations);
      return res.status(OK).json(data);
    };
  }

  updateOne(DtoModel, relations) {
    return async (req, res) => {
      const dto = new DtoModel(req.body);
      const data = await this.service.updateOne(dto, relations);
      return res.status(OK).json(data);
    };
  }

  async softDelete(req, res) {
      const { id } = req.query;
      const data = await this.service.softDelete(id);
      return res.status(OK).json(data);
  }
}
