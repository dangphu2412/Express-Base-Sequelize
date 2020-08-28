import express from 'express';
import { BadRequest } from '../../utils/errors';

const router = express.Router();

router.get('/hello', (req, res, next) => {
  try {
    throw new BadRequest('Bad suck');
  } catch (error) {
    return next(error);
  }
});

export default router;
