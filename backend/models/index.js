'use strict';
const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const { Umzug, SequelizeStorage } = require('umzug');
const process = require('process');
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/../config/database.js')[env];
const db = {};

let sequelize;
if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
  sequelize = new Sequelize(config.database, config.username, config.password, config);
}

// Load all model files from this directory and associate them
fs
  .readdirSync(__dirname)
  .filter(file => {
    return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
  })
  .forEach(file => {
    const model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes);
    db[model.name] = model;
  });

// Associate models if they have associations defined
Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

// Define a function for running migrations
var migrate = function () {
  return new Promise((resolve, reject) => {
    const umzug = new Umzug({
      migrations: {
        glob: 'migrations/*.js',
        resolve: ({ name, path, context }) => {
          const migration = require(path);
          return {
            name,
            up: async () => migration.up(context, Sequelize),
            down: async () => migration.down(context, Sequelize),
          };
        },
      },
      context: sequelize.getQueryInterface(),
      storage: new SequelizeStorage({ sequelize }),
      logger: console,
    });
    umzug.up().then(function (migrations) {
      resolve(migrations);
    }).catch(err => {
      reject(err);
    });
  });
}

// Attach sequelize, Sequelize, and migrate function to the db object
db.sequelize = sequelize;
db.Sequelize = Sequelize;
db.sequelize.migrate = migrate;

module.exports = db; // Export the db object with models, sequelize, and migration function
