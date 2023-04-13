import { Sequelize, Dialect } from "sequelize";
import dotenv from "dotenv";

dotenv.config();

const DB_NAME: string = process.env.DB_NAME as string;
const DB_USER: string = process.env.DB_USER as string;
const DB_DIALECT: Dialect = process.env.DB_DIALECT as Dialect;
const DB_HOST = process.env.DB_HOST;
const DB_PASSWORD = process.env.DB_PASSWORD;

const dbConnection = new Sequelize(DB_NAME, DB_USER, DB_PASSWORD, {
    host: DB_HOST,
    dialect: DB_DIALECT
});

export default dbConnection;