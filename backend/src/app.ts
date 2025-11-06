import express from "express";
import messageRoutes from "./routes/messageRoutes.ts";
import chatRoutes from "./routes/chatRoutes.ts";
import userRoutes from "./routes/userRoutes.ts";

const app = express();

app.use(express.json());
app.use("/api/v1/chats", chatRoutes);
app.use("/api/v1/chats", messageRoutes);
app.use("/api/v1/user", userRoutes);

export default app;
