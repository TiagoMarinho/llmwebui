import { DataTypes, Model, ModelStatic, Sequelize } from "sequelize";
import { UserAttributes } from "../types/UserAttributes";

export default class User
	extends Model<UserAttributes>
	implements UserAttributes
{
	public id!: number;
	public username!: string;
	public settings!: any;

	static initModel(sequelize: Sequelize) {
		return super.init(
			{
				id: {
					type: DataTypes.INTEGER,
					autoIncrement: true,
					primaryKey: true,
				},
				username: {
					type: DataTypes.STRING,
					allowNull: false,
					unique: true,
					validate: {
						notNull: { msg: "Username is required" },
						notEmpty: { msg: "Username cannot be empty" },
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
				modelName: "User",
				tableName: "users",
				timestamps: false,
			},
		) as typeof User;
	}

	static associate(models: { [key: string]: ModelStatic<Model> }) {
		// Define associations here if needed in the future
	}
}
