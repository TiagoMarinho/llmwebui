import { DataTypes, Model, Sequelize, ModelStatic } from "sequelize";
import { Character, MessageAttributes } from "../types/index.ts";
import { Role } from "../types/Role.ts";

export default class Message
	extends Model<MessageAttributes>
	implements MessageAttributes
{
	public id!: number;
	public chatId!: number;
	public character!: Character;
	public role!: Role;
	public text!: string;
	public metadata!: object | null;

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
				chatId: {
					type: DataTypes.INTEGER,
					allowNull: false,
					validate: {
						notNull: { msg: "Chat ID is required" },
						notEmpty: { msg: "Chat ID cannot be empty" },
					},
				},
				character: {
					type: DataTypes.STRING,
					allowNull: false,
					validate: {
						notNull: { msg: "Character is required" },
						notEmpty: { msg: "Character cannot be empty" },
						len: {
							args: [1, 255],
							msg: "Character must be between 1 and 255 characters",
						},
					},
				},
				role: {
					type: DataTypes.ENUM(...Object.values(Role)),
					allowNull: false,
					validate: {
						notNull: { msg: "Role is required" },
					},
				},
				text: {
					type: DataTypes.TEXT,
					allowNull: false,
					validate: {
						notNull: { msg: "Text is required" },
						notEmpty: { msg: "Text cannot be empty" },
					},
				},
				metadata: {
					type: DataTypes.JSON,
					allowNull: true,
				},
			},
			{
				sequelize,
				modelName: "Message",
				tableName: "messages",
				timestamps: true,
			},
		) as typeof Message;
	}

	static associate(models: { [key: string]: ModelStatic<Model> }) {
		this.belongsTo(models.Chat, {
			as: "chat",
			foreignKey: "chatId",
			onDelete: "CASCADE",
		});
	}
}
