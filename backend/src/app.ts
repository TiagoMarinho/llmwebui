import express from "express";
import messageRoutes from "./routes/messageRoutes.ts";
import chatRoutes from "./routes/chatRoutes.ts";

const app = express();

app.use(express.json());
app.use("/api/v1/chats", chatRoutes);
app.use("/api/v1/chats", messageRoutes);

export default app;
