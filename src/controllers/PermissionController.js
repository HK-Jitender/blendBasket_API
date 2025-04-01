// controller/PermissionController.js
const httpStatus = require('http-status');
const PermissionService = require('../service/PermissionService');
const logger = require('../config/logger');

class PermissionController {
    constructor() {
        this.permissionService = new PermissionService();
    }

    createPermission = async (req, res) => {
        try {
            const permission = await this.permissionService.createPermission(req.body);
            res.status(permission.statusCode).send(permission.response);
        } catch (e) {
            logger.error(e);
            res.status(httpStatus.BAD_GATEWAY).send(e);
        }
    };

    getPermissions = async (req, res) => {
        try {
            const permissions = await this.permissionService.getPermissions();
            res.status(permissions.statusCode).send(permissions.response);
        } catch (e) {
            logger.error(e);
            res.status(httpStatus.BAD_GATEWAY).send(e);
        }
    };

    getPermissionByUuid = async (req, res) => {
        try {
            const permission = await this.permissionService.getPermissionByUuid(req.params.uuid);
            res.status(permission.statusCode).send(permission.response);
        } catch (e) {
            logger.error(e);
            res.status(httpStatus.BAD_GATEWAY).send(e);
        }
    };

    updatePermission = async (req, res) => {
        try {
            const permission = await this.permissionService.updatePermission(req.params.uuid, req.body);
            res.status(permission.statusCode).send(permission.response);
        } catch (e) {
            logger.error(e);
            res.status(httpStatus.BAD_GATEWAY).send(e);
        }
    };

    deletePermission = async (req, res) => {
        try {
            const permission = await this.permissionService.deletePermission(req.params.uuid);
            res.status(permission.statusCode).send(permission.response);
        } catch (e) {
            logger.error(e);
            res.status(httpStatus.BAD_GATEWAY).send(e);
        }
    };
}

module.exports = PermissionController;
