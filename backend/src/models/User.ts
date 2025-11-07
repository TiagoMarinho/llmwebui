import { DataTypes, Model, ModelStatic, Sequelize } from "sequelize";
import { SettingsProfileAttributes } from "../types/UserAttributes";

export default class SettingsProfile
	extends Model<SettingsProfileAttributes>
	implements SettingsProfileAttributes
{
	public id!: number;
	public name!: string;
	public settings!: object;

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
					unique: true,
					validate: {
						notNull: { msg: "Name is required" },
						notEmpty: { msg: "Name cannot be empty" },
					},
				},
				settings: {
					type: DataTypes.JSON,
					allowNull: false,
					defaultValue: { temperature: 0.5 },
				},
			},
			{
				sequelize,
				modelName: "SettingsProfile",
				tableName: "settings_profiles",
				timestamps: true,
			},
		) as typeof SettingsProfile;
	}

	static associate(models: { [key: string]: ModelStatic<Model> }) {
		// Define associations here if needed in the future
	}
}
