import express from 'express';
import { sequelize } from '../db';
import { DataTypes } from 'sequelize';

const router = express.Router();

// Define Vehicle model
const Vehicle = sequelize.define('Vehicle', {
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    type: {
        type: DataTypes.STRING,
        allowNull: false
    },
    status: {
        type: DataTypes.STRING,
        defaultValue: 'available'
    },
    createdAt: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
    }
});

// Sync model with database
Vehicle.sync();

// Create new vehicle
router.post('/vehicles', async (req, res) => {
    try {
        const vehicle = await Vehicle.create({
            name: req.body.name,
            type: req.body.type,
            status: req.body.status || 'available'
        });
        res.status(201).json(vehicle);
    } catch (error) {
        res.status(500).json({ error: 'Failed to create vehicle' });
    }
});

// Get all vehicles
router.get('/vehicles', async (req, res) => {
    try {
        const vehicles = await Vehicle.findAll();
        res.json(vehicles);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch vehicles' });
    }
});

// Update vehicle status
router.put('/vehicles/:id', async (req, res) => {
    try {
        const vehicle = await Vehicle.findByPk(req.params.id);
        if (vehicle) {
            await vehicle.update({ status: req.body.status });
            res.json(vehicle);
        } else {
            res.status(404).json({ error: 'Vehicle not found' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Failed to update vehicle' });
    }
});

export default router;
