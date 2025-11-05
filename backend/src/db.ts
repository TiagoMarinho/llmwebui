import { Sequelize } from "sequelize";

const sequelize = new Sequelize("sqlite:./database/database.sqlite", {
	dialect: "sqlite",
	logging: false,
});

export const cleanup = async () => {
	await sequelize.close();
	process.exit(0);
}

export default sequelize;
