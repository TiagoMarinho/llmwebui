import express from "express";
import messageRoutes from "./routes/messageRoutes.js";
import chatRoutes from "./routes/chatRoutes.js";

const app = express();

app.use(express.json());
app.use("/api/v1/chats", chatRoutes);
app.use("/api/v1/chats/:chatId/messages", messageRoutes);
app.use("/api/v1/chats", messageRoutes);

export default app;