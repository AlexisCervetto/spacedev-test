const tables = require('../constants/tables');
const movementTypes = require('../constants/movementTypes');

module.exports = (sequelize, type) => {
    return sequelize.define(tables.MOVEMENTS, {
        id:{
            type: type.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        concept: {
            type: type.STRING,
            allowNull: false
        },
        amount: {
            type: type.DOUBLE,
            allowNull: false
        },
        type: {
            type:   type.ENUM,
            allowNull: false,
            values: [movementTypes.CREDIT, movementTypes.DEBIT]
        },
    });
}