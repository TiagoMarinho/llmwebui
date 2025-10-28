// backend/src/server.js
import app from './app.js';
import sequelize from './db.js';
import Message from './models/Message.js';

const PORT = process.env.PORT || 5000;

(async () => {
	try {
		await sequelize.sync({ alter: true });
		console.log('Database synced');

		app.listen(PORT, () => {
			console.log(`Server running on http://localhost:${PORT}`);
		});
	} catch (err) {
		console.error('Failed to start server', err);
	}
})();
