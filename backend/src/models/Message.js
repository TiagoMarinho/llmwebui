import { DataTypes } from 'sequelize';
import sequelize from '../db.js';

const Message = sequelize.define('Message', {
	id: {
		type: DataTypes.INTEGER,
		autoIncrement: true,
		primaryKey: true,
	},
	character: {
		type: DataTypes.STRING,
		allowNull: false,
		defaultValue: 'default',
	},
	role: {
		type: DataTypes.ENUM('user', 'assistant', 'system'),
		allowNull: false,
	},
	text: {
		type: DataTypes.TEXT,
		allowNull: false,
	},
}, {
	tableName: 'messages',
	timestamps: true,
});

export default Message;
