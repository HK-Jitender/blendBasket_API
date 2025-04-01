// models/permission.js
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class Permission extends Model {
        static associate(models) {
            // Define associations here if needed
        }
    }

    Permission.init(
        {
            uuid: DataTypes.UUID,
            name: DataTypes.STRING,
            description: DataTypes.STRING,
            status: DataTypes.BOOLEAN,  // Assuming it's a boolean field
        },
        {
            sequelize,
            modelName: 'permission',
            underscored: true,
        },
    );

    return Permission;
};
