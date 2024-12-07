import express from 'express';
import Call from '../models/Call';

const router = express.Router();

router.get('/calls', async (req, res) => {
    const calls = await Call.findAll();
    res.json(calls);
});

router.post('/calls', async (req, res) => {
    const { caller, description, location } = req.body;
    const newCall = await Call.create({ caller, description, location, status: 'open' });
    res.json(newCall);
});

export default router;
