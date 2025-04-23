const express = require('express');
const router = express.Router();
const db = require('../models');

// Rate a car
router.post('/', async (req, res) => {
    try {
        const { car_id, user_id, rate } = req.body;

        if (rate < 0 || rate > 5) {
            return res.status(400).json({ error: 'Rating must be between 0 and 5' });
        }

        const [rating, created] = await db.Rating.findOrCreate({
            where: { carId: car_id, userId: user_id },
            defaults: { rate }
        });

        if (!created) {
            await rating.update({ rate });
        }

        res.status(201).json(rating);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

module.exports = router;