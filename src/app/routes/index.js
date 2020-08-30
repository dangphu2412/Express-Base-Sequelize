import express from 'express';
import { ExampleHandler } from '../core/Example/handler';

const router = express.Router();

ExampleHandler.register(router);

export default router;
