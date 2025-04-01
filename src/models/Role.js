// models/role.js
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class Role extends Model {
        static associate(models) {
            // define association here
        }
    }

    Role.init(
        {
            uuid: DataTypes.UUID,
            name: DataTypes.STRING,
            description: DataTypes.STRING,
            status: DataTypes.BOOLEAN,  // Change status to BOOLEAN
        },
        {
            sequelize,
            modelName: 'role',
            underscored: true,
        },
    );

    return Role;
};
