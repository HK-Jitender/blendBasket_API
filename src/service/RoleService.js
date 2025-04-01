// service/RoleService.js
const httpStatus = require('http-status');
const { v4: uuidv4 } = require('uuid');
const RoleDao = require('../dao/RoleDao');
const responseHandler = require('../helper/responseHandler');
const logger = require('../config/logger');
const { roleConstant } = require('../config/constant');
const { cloneDeep } = require('sequelize/lib/utils');

class RoleService {
    constructor() {
        this.roleDao = new RoleDao();
    }

    /**
     * Create a new role
     * @param {Object} roleBody
     * @returns {Object}
     */
    createRole = async (roleBody) => {
        try {
            let message = 'Role created successfully!';
            if (await this.roleDao.isNameExists(roleBody.name)) {
                return responseHandler.returnError(httpStatus.BAD_REQUEST, 'Role name already exists');
            }
            const uuid = uuidv4();
            roleBody.uuid = uuid;
          

            const roleData = await this.roleDao.create(roleBody);

            if (!roleData) {
                message = 'Role creation failed! Please try again.';
                return responseHandler.returnError(httpStatus.BAD_REQUEST, message);
            }

            return responseHandler.returnSuccess(httpStatus.CREATED, message, roleData);
        } catch (e) {
            logger.error(e);
            return responseHandler.returnError(httpStatus.BAD_REQUEST, 'Something went wrong!');
        }
    };

    /**
     * Get all roles
     * @returns {Object}
     */
    getRoles = async () => {
        try {
            const roles = await this.roleDao.findAll();
            return responseHandler.returnSuccess(httpStatus.OK, 'Roles fetched successfully!', roles);
        } catch (e) {
            logger.error(e);
            return responseHandler.returnError(httpStatus.BAD_REQUEST, 'Something went wrong!');
        }
    };

    /**
     * Get role by UUID
     * @param {String} uuid
     * @returns {Object}
     */
    getRoleByUuid = async (uuid) => {
        try {
            const role = await this.roleDao.findOneByWhere({ uuid });
            if (!role) {
                return responseHandler.returnError(httpStatus.NOT_FOUND, 'Role not found!');
            }
            return responseHandler.returnSuccess(httpStatus.OK, 'Role fetched successfully!', role);
        } catch (e) {
            logger.error(e);
            return responseHandler.returnError(httpStatus.BAD_REQUEST, 'Something went wrong!');
        }
    };

    /**
     * Update role
     * @param {String} uuid
     * @param {Object} roleBody
     * @returns {Object}
     */
    updateRole = async (uuid, roleBody) => {
        try {
            const role = await this.roleDao.findOneByWhere({ uuid });
            if (!role) {
                return responseHandler.returnError(httpStatus.NOT_FOUND, 'Role not found!');
            }

            const updatedRole = await this.roleDao.updateWhere(roleBody, { uuid });

            return responseHandler.returnSuccess(httpStatus.OK, 'Role updated successfully!', updatedRole);
        } catch (e) {
            logger.error(e);
            return responseHandler.returnError(httpStatus.BAD_REQUEST, 'Something went wrong!');
        }
    };

    /**
     * Delete role
     * @param {String} uuid
     * @returns {Object}
     */
    deleteRole = async (uuid) => {
        try {
            const role = await this.roleDao.findOneByWhere({ uuid });
            if (!role) {
                return {
                    statusCode: httpStatus.NOT_FOUND,
                    response: {
                        status: false,
                        code: httpStatus.NOT_FOUND,
                        message: 'Role not found!',
                    },
                };
            }
    
            await this.roleDao.deleteRole({ uuid });
            return {
                statusCode: httpStatus.OK,
                response: {
                    status: true,
                    code:httpStatus.OK,
                    message: 'Role deleted successfully!',
                },
            };
        } catch (e) {
            logger.error(e);
            return {
                statusCode: httpStatus.BAD_REQUEST,
                response: {
                    status: false,
                    code:httpStatus.BAD_REQUEST,
                    message: 'Something went wrong!',
                },
            };
        }
    };
}

module.exports = RoleService;
