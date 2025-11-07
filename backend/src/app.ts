import express from "express";
import messageRoutes from "./routes/messageRoutes.ts";
import chatRoutes from "./routes/chatRoutes.ts";
import characterRoutes from "./routes/characterRoutes.ts";

const app = express();

app.use(express.json());

app.use("/api/v1/characters", characterRoutes);
app.use("/api/v1/chats", chatRoutes);
app.use("/api/v1/chats", messageRoutes);

export default app;