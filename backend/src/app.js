import express from 'express';
import chatRoutes from './routes/chatRoutes.js';

const app = express();
app.use(express.json());

// API routes
app.use('/api/v1/chat', chatRoutes);

export default app;
