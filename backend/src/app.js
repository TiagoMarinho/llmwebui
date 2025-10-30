import express from 'express';
import chatRoutes from './routes/chatRoutes.js';
import messageRoutes from './routes/messageRoutes.js';

const app = express();
app.use(express.json());

// API routes
app.use('/api/v1/chat', chatRoutes);
app.use('/api/v1/messages', messageRoutes);

export default app;