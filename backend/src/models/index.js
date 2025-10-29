import sequelize from '../db.js';
import Chat from './models/Chat.js';
import Message from './models/Message.js';

const models = { Chat, Message };

Object.values(models).forEach(model => model.init(sequelize));

Object.values(models)
	.filter(model => typeof model.associate === 'function')
	.forEach(model => model.associate(models))

export { sequelize, models };