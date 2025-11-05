import { Sequelize } from "sequelize";

const sequelize = new Sequelize("sqlite:./database/database.sqlite", {
	dialect: "sqlite",
	logging: false,
});

export default sequelize;
