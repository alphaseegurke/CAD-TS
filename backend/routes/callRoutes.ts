import express from 'express';
import { sequelize } from '../db';
import { DataTypes } from 'sequelize';

const router = express.Router();

// Define Call model
const Call = sequelize.define('Call', {
    description: {
        type: DataTypes.STRING,
        allowNull: false
    },
    status: {
        type: DataTypes.STRING,
        defaultValue: 'pending'
    },
    createdAt: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
    }
});

// Sync model with database
Call.sync();

// Create new call
router.post('/calls', async (req, res) => {
    try {
        const call = await Call.create({
            description: req.body.description
        });
        res.status(201).json(call);
    } catch (error) {
        res.status(500).json({ error: 'Failed to create call' });
    }
});

// Get all calls
router.get('/calls', async (req, res) => {
    try {
        const calls = await Call.findAll();
        res.json(calls);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch calls' });
    }
});

export default router;
