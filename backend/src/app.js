import express from "express";
import messageRoutes from "./routes/messageRoutes.js";

const app = express();
app.use(express.json());
app.use("/api/v1/chats", messageRoutes);

export default app;