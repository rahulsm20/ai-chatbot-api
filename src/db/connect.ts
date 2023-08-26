import { Sequelize } from "sequelize";

const client = new Sequelize("app", "", "", {
  storage: "./db.sqlite",
  dialect: "sqlite",
  logging: false,
}); 

export default client;
