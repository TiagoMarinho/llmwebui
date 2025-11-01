import app from "./app.ts";
import { sequelize, initModels } from "./models/index.ts";

initModels();

(async () => {
	try {
		await sequelize.sync({ alter: true });
		console.log("Database synced");

		const PORT = process.env.PORT || 5000;
		app.listen(PORT, () => {
			console.log(`Server running on http://localhost:${PORT}`);
		});
	} catch (err) {
		console.error("Failed to start server", err);
	}
})();
