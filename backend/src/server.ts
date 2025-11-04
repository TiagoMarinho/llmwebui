import app from "./app.ts";
import { sequelize, initModels } from "./models/index.ts";

initModels();

(async () => {
	try {
		await sequelize.sync();
		console.log("Database synced");

		const PORT = process.env.PORT || 5000;
		const server = app.listen(PORT, () => {
			console.log(`Server running on http://localhost:${PORT}`);
		});

		// gracefully close the server and database connection
		const gracefulShutdown = async (signal: string) => {
			console.log(`\n${signal} received. Shutting down gracefully...`);
			server.close(async () => {
				console.log("HTTP server closed.");
				await sequelize.close();
				console.log("Database connection closed.");
				process.exit(0);
			});
		};

		process.on("SIGTERM", () => gracefulShutdown("SIGTERM")); // generic termination signal
		process.on("SIGINT", () => gracefulShutdown("SIGINT")); // sent by Ctrl+C
	} catch (err) {
		console.error("Failed to start server", err);
	}
})();
