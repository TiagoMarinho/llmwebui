import sequelize from "../db.js";
import Chat from "./Chat.js";
import Message from "./Message.js";

const models = { Chat, Message };

export const initModels = (_) => {
	Object.values(models).forEach((model) => model.init(sequelize));

	Object.values(models)
		.filter((model) => typeof model.associate === "function")
		.forEach((model) => model.associate(models));
};

export { sequelize, models };
