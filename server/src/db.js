require("dotenv").config();
const { Sequelize } = require("sequelize");
const fs = require('fs');
const path = require('path');
const ActivityModel = require("./models/Activity");
const CountryModel = require("./models/Country");
const {
  DB_USER, DB_PASSWORD, DB_HOST, BDD
} = process.env;

const sequelize = new Sequelize(
  `postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/${BDD}`, 
  {
  logging: false, 
  native: false, 
  }
);

const basename = sequelize;

const modelDefiners = [];

fs.readdirSync(path.join(__dirname, '/models'))
  .filter((file) => (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js'))
  .forEach((file) => {
    modelDefiners.push(require(path.join(__dirname, '/models', file)));
  });


modelDefiners.forEach(model => model(sequelize));

let entries = Object.entries(sequelize.models);
let capsEntries = entries.map((entry) => [entry[0][0].toUpperCase() + entry[0].slice(1), entry[1]]);
sequelize.models = Object.fromEntries(capsEntries);

ActivityModel(sequelize);
CountryModel(sequelize);

const { Country, Activity } = sequelize.models;

// Aca vendrian las relaciones
Country.belongsToMany(Activity, { through: 'Country_Activity' });
Activity.belongsToMany(Country, { through: 'Country_Activity' });

module.exports = {
  Activity,
  Country,
  conn: sequelize,     // para importart la conexión { conn } = require('./db.js');
};