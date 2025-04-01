// dao/RoleDao.js
const SuperDao = require('./SuperDao');
const models = require('../models');

const Role = models.role;

class RoleDao extends SuperDao {
    constructor() {
        super(Role);
    }

    async findByName(name) {
        return Role.findOne({ where: { name } });
    }

    async isNameExists(name) {
        // return Role.count({ where: { name } }).then((count) => {
        //     return count !== 0;
        // });
        try {
            const count = await Role.count({ where: { name } });
            return count !== 0;
        } catch (err) {
            console.error('Error checking role name:', err);  // Log error
            throw new Error('Error checking if name exists');  // Rethrow or handle error appropriately
        }
    }

    async createWithTransaction(role, transaction) {
        return Role.create(role, { transaction });
    }

    async deleteRole({ uuid }) {
        try {
            // Assuming Role has a UUID column and is being used as the identifier
            const role = await Role.findOne({ where: { uuid } });
            if (!role) {
                throw new Error('Role not found');
            }
            // Delete the role
            await role.destroy();
            return true;
        } catch (err) {
            console.error('Error deleting role:', err);
            throw new Error('Error deleting role');
        }
    }


}

module.exports = RoleDao;
