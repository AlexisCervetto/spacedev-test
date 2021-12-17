const Sequelize = require("sequelize");

const MovementModel = require("./models/movement");

// Cambiar a gusto
const dbname = "spacedev_test";
const dbuser = "root";
const dbpass = "";
const dbhost = "localhost";
const dbtype = "mysql";

const sequelize  = new Sequelize(dbname, dbuser, dbpass, {
    host: dbhost,
    dialect: dbtype
})

const Movement = MovementModel(sequelize, Sequelize);

sequelize.sync({ force:false }).then(() => {
    console.log("Tablas sincronizadas");
});

module.exports = {
    Movement
}