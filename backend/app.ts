import express from 'express';
import cors from 'cors';
import { createDatabaseConnection } from './db';
import cadRoutes from './routes/cadRoutes';

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());
app.use('/api/cad', cadRoutes);

createDatabaseConnection();

app.listen(PORT, () => {
    console.log(`CAD API läuft auf http://localhost:${PORT}`);
});
