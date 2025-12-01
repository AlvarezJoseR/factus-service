import dotenv from "dotenv";
dotenv.config();

export default {
  PUERTO: process.env.PUERTO || 3000,
  JWT_EXPIRES: process.env.JWT_EXPIRES || "24",
  JWT_SECRET: process.env.JWT_SECRET || "test",
  LOG_LEVEL: process.env.LOG_LEVEL || "debug",
  DB_HOST: process.env.DB_HOST || "localhost",
  DB_USER: process.env.DB_USER || "root",
  DB_PASS: process.env.DB_PASS || "",
  DB_NAME: process.env.DB_NAME || "codingCloud",
  DB_PORT: process.env.DB_PORT || 3306,
  NODE_FRONTEND: process.env.NODE_FRONTEND || "*",

};
