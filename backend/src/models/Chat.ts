import { DataTypes, Model, ModelStatic, Sequelize } from "sequelize";
import { ChatAttributes } from "../types/index.ts";

export default class Chat
	extends Model<ChatAttributes>
	implements ChatAttributes
{
	public id!: number;
	public title!: string;
	public characterId!: number; // Changed from: public character!: string;

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
				characterId: {
					// This block replaces the old 'character: { ... }' block
					type: DataTypes.INTEGER,
					allowNull: false,
					validate: {
						notNull: { msg: "Character ID is required" },
					},
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

		// Add this association to link Chat to Character
		this.belongsTo(models.Character, {
			as: "character",
			foreignKey: "characterId",
		});
	}
}