import { Sequelize } from "sequelize";
import Chat from "./Chat.ts";
import Message from "./Message.ts";
import Character from "./Character.ts";

const models = { Chat, Message, Character };

export const initModels = (sequelize: Sequelize) => {
	Object.values(models).forEach((model) => model.initModel(sequelize));

	Object.values(models)
		.filter((model) => typeof model.associate === "function")
		.forEach((model) => model.associate(models));
};

export { models };