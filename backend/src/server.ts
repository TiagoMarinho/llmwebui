import app from "./app.ts";
import { sequelize, initModels } from "./models/index.ts";

(async () => {
	try {
		initModels();
		await sequelize.sync();
		console.log("Database synced");

		const PORT = process.env.PORT || 5000;
		app.listen(PORT, () => {
			console.log(`Server running on http://localhost:${PORT}`);
		});
	} catch (err) {
		console.error("Failed to start server", err);
	}
})();

const gracefulShutdown = async () => {
	try {
		await sequelize.close();
	} catch (err) {
		console.error("Error during shutdown", err);
	} finally {
		process.exit(0);
	}
};

const terminationEvents = ["SIGTERM", "SIGINT", "SIGUSR2"];
terminationEvents.forEach((terminationEventName) => {
	process.once(terminationEventName, async () => gracefulShutdown());
});
