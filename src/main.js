import express from 'express';
import logger from 'morgan';
import methodOverride from 'method-override';
import cors from 'cors';
import swaggerUi from 'swagger-ui-express';
import env from 'dotenv';

import { NOT_FOUND } from 'http-status';
import initRoutes from './app/routes';
import { errorHandler } from './utils/errors';

const app = express();

env.config();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors('*'));
app.use(methodOverride('X-HTTP-Method-Override'));
app.use(methodOverride((req) => {
    if (req.body && typeof req.body === 'object' && '_method' in req.body) {
        const method = req.body._method;
        delete req.body._method;
        return method;
    }
    return undefined;
}));

app.use('/api/v1/', initRoutes);
// app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerConfig));

app.use(errorHandler);

app.use('*', (req, res) => res.status(NOT_FOUND).json({
    status: NOT_FOUND,
    message: `Can not GET ${req.originalUrl}`,
}));

export default app;
