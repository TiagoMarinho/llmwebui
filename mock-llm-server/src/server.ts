import express from "express";
import { handleChatRequest } from "./controller.ts";

(async () => {
	try {
		const app = express();
		app.use(express.json());

		const PORT = process.env.PORT || 3001;

		app.post("/v1/chat/completions", handleChatRequest);

		app.listen(PORT, () => {
			console.log(`Mock LLM Server running on http://localhost:${PORT}`);
		});
	} catch (error) {
		console.error("Failed to start Mock LLM Server", error);
	}
})();
