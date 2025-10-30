import { Sequelize } from 'sequelize';
import Message from './models/Message.js';

const sequelize = new Sequelize("sqlite:./database/database.sqlite", {
	dialect: 'sqlite',
	logging: false,
});

Message.init(sequelize);


export { sequelize, Message };
export default sequelize;
