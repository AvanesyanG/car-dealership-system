const express = require('express');
const router = express.Router();
const db = require('../models');

// Add feature to car
router.post('/:carId/features', async (req, res) => {
    try {
        const car = await db.Car.findByPk(req.params.carId);
        if (!car) {
            return res.status(404).json({ error: 'Car not found' });
        }

        const feature = await db.Feature.findByPk(req.body.featureId);
        if (!feature) {
            return res.status(404).json({ error: 'Feature not found' });
        }

        await car.addFeature(feature);
        res.status(200).json({ message: 'Feature added successfully' });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Remove feature from car
router.delete('/:carId/features/:featureId', async (req, res) => {
    try {
        const car = await db.Car.findByPk(req.params.carId);
        if (!car) {
            return res.status(404).json({ error: 'Car not found' });
        }

        const feature = await db.Feature.findByPk(req.params.featureId);
        if (!feature) {
            return res.status(404).json({ error: 'Feature not found' });
        }

        await car.removeFeature(feature);
        res.status(200).json({ message: 'Feature removed successfully' });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

module.exports = router;
