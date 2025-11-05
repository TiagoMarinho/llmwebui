import { Sequelize } from "sequelize";
import { initModels } from "./models/index.ts";

const sequelize = new Sequelize("sqlite:./database/database.sqlite", {
	dialect: "sqlite",
	logging: false,
});

export const connectToDatabase = async () => {
	try {
		initModels(sequelize);
		await sequelize.sync();
		console.log("Database synced");
	} catch (err) {
		console.error("Database connection failed:", err);
		throw err;
	}
	return sequelize;
};

export const closeDatabaseConnection = async () => {
	await sequelize.close();
};

export default sequelize;
