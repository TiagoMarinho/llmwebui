import { DataTypes, Model, ModelStatic, Sequelize } from "sequelize";
import { ChatAttributes } from "../types";

export default class Chat extends Model<ChatAttributes> implements ChatAttributes {
	public id!: number;
	public title!: string;
	public character!: string;

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
				character: {
					type: DataTypes.STRING,
					allowNull: false,
					defaultValue: "default",
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
