import express from 'express';
import { AuthHandler } from '../core/Auth/handler';
import { UserHandler } from '../core/User/handler';
import { RoleHandler } from '../core/Role/handler';
import { PermissionHandler } from '../core/Permission/handler';

const router = express.Router();

AuthHandler.register(router);
UserHandler.register(router);
RoleHandler.register(router);
PermissionHandler.register(router);

export default router;
