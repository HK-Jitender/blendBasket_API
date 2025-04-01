// controller/RoleController.js
const httpStatus = require('http-status');
const RoleService = require('../service/RoleService');
const logger = require('../config/logger');

class RoleController {
    constructor() {
        this.roleService = new RoleService();
    }

    createRole = async (req, res) => {
        try {
            const role = await this.roleService.createRole(req.body);
            res.status(role.statusCode).send(role.response);
        } catch (e) {
            logger.error(e);
            res.status(httpStatus.BAD_GATEWAY).send(e);
        }
    };

    getRoles = async (req, res) => {
        try {
            const roles = await this.roleService.getRoles();
            res.status(roles.statusCode).send(roles.response);
        } catch (e) {
            logger.error(e);
            res.status(httpStatus.BAD_GATEWAY).send(e);
        }
    };

    getRoleByUuid = async (req, res) => {
        try {
            const role = await this.roleService.getRoleByUuid(req.params.uuid);
            res.status(role.statusCode).send(role.response);
        } catch (e) {
            logger.error(e);
            res.status(httpStatus.BAD_GATEWAY).send(e);
        }
    };

    updateRole = async (req, res) => {
        try {
            const role = await this.roleService.updateRole(req.params.uuid, req.body);
            res.status(role.statusCode).send(role.response);
        } catch (e) {
            logger.error(e);
            res.status(httpStatus.BAD_GATEWAY).send(e);
        }
    };

    deleteRole = async (req, res) => {
        try {
            const role = await this.roleService.deleteRole(req.params.uuid);
            res.status(role.statusCode).send(role.response);
        } catch (e) {
            logger.error(e);
            res.status(httpStatus.BAD_GATEWAY).send(e);
        }
    };
}

module.exports = RoleController;
