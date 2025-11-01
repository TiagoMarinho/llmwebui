import sequelize from "../db.ts";
import Chat from "./Chat.ts";
import Message from "./Message.ts";

const models = { Chat, Message };

export const initModels = () => {
	Object.values(models).forEach((model) => model.init(sequelize));

	Object.values(models)
		.filter((model) => typeof model.associate === "function")
		.forEach((model) => model.associate(models));
};

export { sequelize, models };
