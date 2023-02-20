import fs from 'fs'
import path from 'path'
import SQ from '@sequelize/core'
import configData from '../config/config.js'
import { fileURLToPath } from 'url';
import Shop from './Shop.js'
import Widget from './Widget.js'
import Plan from './Plan.js'

const Sequelize = SQ.Sequelize;
const DataTypes = SQ.DataTypes;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
// const fs = require('fs');
// const path = require('path');
// const Sequelize = require('sequelize');
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || 'development';
const config = configData[env];
const db = {};

let sequelize;
if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
  sequelize = new Sequelize(config.database, config.username, config.password, config);
}

db.sequelize = sequelize;
db.Shop = Shop(sequelize, DataTypes);
db.Widget = Widget(sequelize, DataTypes);
db.Plan = Plan(sequelize, DataTypes);
db.Sequelize = Sequelize;



export default db;

