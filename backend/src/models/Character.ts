import { DataTypes, Model, ModelStatic, Sequelize } from "sequelize";
import { CharacterAttributes } from "../types/CharacterAttributes.ts";

export default class Character
	extends Model<CharacterAttributes>
	implements CharacterAttributes
{
	public id!: number;
	public name!: string;
	public description!: string | null;
	public avatarUrl!: string | null;
	public story!: string | null;

	public readonly createdAt!: Date;
	public readonly updatedAt!: Date;
	public readonly deletedAt!: Date | null;

	static initModel(sequelize: Sequelize) {
		return super.init(
			{
				id: {
					type: DataTypes.INTEGER,
					autoIncrement: true,
					primaryKey: true,
				},
				name: {
					type: DataTypes.STRING,
					allowNull: false,
					validate: {
						notNull: { msg: "Name is required" },
						notEmpty: { msg: "Name cannot be empty" },
					},
				},
				description: {
					type: DataTypes.TEXT,
					allowNull: true,
				},
				avatarUrl: {
					type: DataTypes.STRING,
					allowNull: false,
					defaultValue: '/images/characters/default_avatar.png',
					set(value) {
						const fallback = '/images/characters/default_avatar.png';
						this.setDataValue('avatarUrl', value || fallback);
					},
				},
			},
			{
				sequelize,
				modelName: "Character",
				tableName: "characters",
				timestamps: true,
				paranoid: true, // Enables soft delete
			},
		) as typeof Character;
	}

	static associate(models: { [key: string]: ModelStatic<Model> }) {
		this.hasMany(models.Message, {
			as: "messages",
			foreignKey: "characterId",
		});
	}
}