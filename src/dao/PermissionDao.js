// dao/PermissionDao.js
const SuperDao = require('./SuperDao');
const models = require('../models');

const Permission = models.permission;

class PermissionDao extends SuperDao {
    constructor() {
        super(Permission);
    }

    async findByName(name) {
        return Permission.findOne({ where: { name } });
    }

    async isNameExists(name) {
        try {
            const count = await Permission.count({ where: { name } });
            return count !== 0;
        } catch (err) {
            console.error('Error checking permission name:', err);
            throw new Error('Error checking if name exists');
        }
    }

    async createWithTransaction(permission, transaction) {
        return Permission.create(permission, { transaction });
    }

    async deletePermission({ uuid }) {
        try {
            const permission = await Permission.findOne({ where: { uuid } });
            if (!permission) {
                throw new Error('Permission not found');
            }
            await permission.destroy();
            return true;
        } catch (err) {
            console.error('Error deleting permission:', err);
            throw new Error('Error deleting permission');
        }
    }
}

module.exports = PermissionDao;
