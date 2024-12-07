import express from 'express';
import cors from 'cors';
import { sequelize } from './db';
import authRoutes from './routes/authRoutes';
import callRoutes from './routes/callRoutes';

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());
app.use('/api/auth', authRoutes);
app.use('/api/calls', callRoutes);

sequelize.sync().then(() => console.log('Database synced!'));

app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
