import { Sequelize } from "sequelize";
import Chat from "./Chat.ts";
import Message from "./Message.ts";
import User from "./User.ts";

const models = { Chat, Message, User };

export const initModels = (sequelize: Sequelize) => {
	Object.values(models).forEach((model) => model.initModel(sequelize));

	Object.values(models)
		.filter((model) => typeof model.associate === "function")
		.forEach((model) => model.associate(models));
};

export { models };
