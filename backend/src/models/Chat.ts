import { DataTypes, Model, ModelStatic, Sequelize } from "sequelize";
import { ChatAttributes } from "../types/index.ts";

export default class Chat
	extends Model<ChatAttributes>
	implements ChatAttributes
{
	public id!: number;
	public title!: string;

	public readonly createdAt!: Date;
	public readonly updatedAt!: Date;

	static initModel(sequelize: Sequelize) {
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
					defaultValue: "Untitled Chat",
				},
			},
			{
				sequelize,
				modelName: "Chat",
				tableName: "chats",
				timestamps: true,
			},
		) as typeof Chat;
	}

	static associate(models: { [key: string]: ModelStatic<Model> }) {
		this.hasMany(models.Message, {
			as: "messages",
			foreignKey: "chatId",
			onDelete: "CASCADE",
		});
	}
}