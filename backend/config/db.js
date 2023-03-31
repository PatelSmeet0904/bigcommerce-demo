const dbConfig = require("./dbConfig.js");

const { Sequelize, DataTypes } = require("sequelize");

const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  operatorsAliases: 0,
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
  logging: false,
});

const checkConnection = async () => {
  try {
    await sequelize.authenticate();
    console.log("Connection has been established successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
};

checkConnection();

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

// db.shops = require("../model/shopModel.js")(sequelize, DataTypes);
db.shops = require("../model/shop.model.js")(sequelize);
db.pricePlans = require("../model/pricingPlans.model")(sequelize);
db.orders = require("../model/orderModel.js")(sequelize, DataTypes);

db.sequelize.sync({ alter: true }).then(() => {
  console.log("yes re-sync done!");
});

module.exports = db;
