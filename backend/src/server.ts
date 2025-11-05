import app from "./app.ts";
import { connectToDatabase, closeDatabaseConnection } from "./db.ts";

(async () => {
	try {
		await connectToDatabase();

		const PORT = process.env.PORT || 5000;
		app.listen(PORT, () => {
			console.log(`Server running on http://localhost:${PORT}`);
		});
	} catch (err) {
		console.error("Failed to start server", err);
	}

	const terminationEvents = ["SIGTERM", "SIGINT", "SIGUSR2"];
	terminationEvents.forEach((terminationEventName) => {
		process.once(terminationEventName, async () => {
			try {
				await closeDatabaseConnection();
			} catch (err) {
				console.error("Error during shutdown", err);
			} finally {
				process.exit(0);
			}
		});
	});
})();
