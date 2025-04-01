// service/PermissionService.js
const httpStatus = require('http-status');
const { v4: uuidv4 } = require('uuid');
const PermissionDao = require('../dao/PermissionDao');
const responseHandler = require('../helper/responseHandler');
const logger = require('../config/logger');

class PermissionService {
    constructor() {
        this.permissionDao = new PermissionDao();
    }

    createPermission = async (permissionBody) => {
        try {
            if (await this.permissionDao.isNameExists(permissionBody.name)) {
                return responseHandler.returnError(httpStatus.BAD_REQUEST, 'Permission name already exists');
            }
            const uuid = uuidv4();
            permissionBody.uuid = uuid;

            const permissionData = await this.permissionDao.create(permissionBody);
            if (!permissionData) {
                return responseHandler.returnError(httpStatus.BAD_REQUEST, 'Permission creation failed!');
            }

            return responseHandler.returnSuccess(httpStatus.CREATED, 'Permission created successfully!', permissionData);
        } catch (e) {
            logger.error(e);
            return responseHandler.returnError(httpStatus.BAD_REQUEST, 'Something went wrong!');
        }
    };

    getPermissions = async () => {
        try {
            const permissions = await this.permissionDao.findAll();
            return responseHandler.returnSuccess(httpStatus.OK, 'Permissions fetched successfully!', permissions);
        } catch (e) {
            logger.error(e);
            return responseHandler.returnError(httpStatus.BAD_REQUEST, 'Something went wrong!');
        }
    };

    getPermissionByUuid = async (uuid) => {
        try {
            const permission = await this.permissionDao.findOneByWhere({ uuid });
            if (!permission) {
                return responseHandler.returnError(httpStatus.NOT_FOUND, 'Permission not found!');
            }
            return responseHandler.returnSuccess(httpStatus.OK, 'Permission fetched successfully!', permission);
        } catch (e) {
            logger.error(e);
            return responseHandler.returnError(httpStatus.BAD_REQUEST, 'Something went wrong!');
        }
    };

    updatePermission = async (uuid, permissionBody) => {
        try {
            const permission = await this.permissionDao.findOneByWhere({ uuid });
            if (!permission) {
                return responseHandler.returnError(httpStatus.NOT_FOUND, 'Permission not found!');
            }

            const updatedPermission = await this.permissionDao.updateWhere(permissionBody, { uuid });
            return responseHandler.returnSuccess(httpStatus.OK, 'Permission updated successfully!', updatedPermission);
        } catch (e) {
            logger.error(e);
            return responseHandler.returnError(httpStatus.BAD_REQUEST, 'Something went wrong!');
        }
    };

    deletePermission = async (uuid) => {
        try {
            const permission = await this.permissionDao.findOneByWhere({ uuid });
            if (!permission) {
                return responseHandler.returnError(httpStatus.NOT_FOUND, 'Permission not found!');
            }

            await this.permissionDao.deletePermission({ uuid });
            return responseHandler.returnSuccess(httpStatus.OK, 'Permission deleted successfully!');
        } catch (e) {
            logger.error(e);
            return responseHandler.returnError(httpStatus.BAD_REQUEST, 'Something went wrong!');
        }
    };
}

module.exports = PermissionService;
