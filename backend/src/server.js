// backend/src/server.js
import app from "./app.js";
import { sequelize, initModels } from "./models/index.js";

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
