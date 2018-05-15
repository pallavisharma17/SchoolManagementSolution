"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = __importDefault(require("sequelize"));
exports.db = new sequelize_1.default({
    username: 'root',
    password: 'root',
    database: 'learning_management_solution',
    host: 'localhost',
    dialect: 'mysql',
    pool: {
        max: 5,
        min: 0,
        idle: 5000
    },
});
exports.db.sync({ alter: true })
    .then(() => console.log("Database has been synced"))
    .catch((err) => console.error("Error syncing database " + err));
