import { DataTypes, Model } from 'sequelize';

export default class Chat extends Model {
	static init(sequelize) {
		return super.init(
			{
				id: {
					type: DataTypes.INTEGER,
					autoIncrement: true,
					primaryKey: true,
				},
				title: {
					type: DataTypes.STRING,
					allowNull: false,
					defaultValue: 'Untitled Chat',
				},
				character: {
					type: DataTypes.STRING,
					allowNull: false,
					defaultValue: 'default',
				},
			},
			{
				sequelize,
				modelName: 'Chat',
				tableName: 'chats',
				timestamps: true,
			}
		);
	}

	// COMMENTED OUT UNTIL CHATS ARE IMPLEMENTED
	/*static associate(models) {
		this.hasMany(models.Message, {
			as: 'messages',
			foreignKey: 'chatId',
			onDelete: 'CASCADE',
		});
	}*/
}
