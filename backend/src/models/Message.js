import { DataTypes, Model } from 'sequelize';

export default class Message extends Model {
	static init(sequelize) {
		return super.init(
			{
				id: {
					type: DataTypes.INTEGER,
					autoIncrement: true,
					primaryKey: true,
				},
				chatId: {
					type: DataTypes.INTEGER,
					allowNull: false,
					validate: {
						notNull: { msg: 'Chat ID is required' },
						notEmpty: { msg: 'Chat ID cannot be empty' },
					}
				},
				character: {
					type: DataTypes.STRING,
					allowNull: false,
					validate: {
						notNull: { msg: 'Character is required' },
						notEmpty: { msg: 'Character cannot be empty' },
						len: {
							args: [1, 255],
							msg: 'Character must be between 1 and 255 characters',
						}
					},
				},
				role: {
					type: DataTypes.ENUM('user', 'assistant', 'system'),
					allowNull: false,
					validate: {
						notNull: { msg: 'Role is required' },
					}
				},
				text: {
					type: DataTypes.TEXT,
					allowNull: false,
					validate: {
						notNull: { msg: 'Text is required' },
						notEmpty: { msg: 'Text cannot be empty' },
					}
				},
				metadata: {
					type: DataTypes.JSON,
					allowNull: true,
				},
			},
			{
				sequelize,
				modelName: 'Message',
				tableName: 'messages',
				timestamps: true,
			}
		);
	}

	static associate(models) {
		this.belongsTo(models.Chat, {
			as: 'chat',
			foreignKey: 'chatId',
			onDelete: 'CASCADE',
		});
	}
}
