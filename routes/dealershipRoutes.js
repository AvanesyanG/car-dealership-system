const express = require('express');
const router = express.Router();
const db = require('../models');

// Create dealership
router.post('/', async (req, res) => {
    try {
        const { name, address, description } = req.body;
        if (!name || !address) {
            return res.status(400).json({ error: 'Name and address are required' });
        }

        const dealership = await db.Dealership.create({ name, address, description });
        res.status(201).json(dealership);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Add user to dealership
router.post('/:id/users', async (req, res) => {
    try {
        const dealership = await db.Dealership.findByPk(req.params.id);
        if (!dealership) {
            return res.status(404).json({ error: 'Dealership not found' });
        }

        const user = await db.User.findByPk(req.body.userId);
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        await dealership.addUser(user);
        res.status(200).json({ message: 'User added to dealership successfully' });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Add car to dealership
router.post('/:id/cars', async (req, res) => {
    try {
        const dealership = await db.Dealership.findByPk(req.params.id);
        if (!dealership) {
            return res.status(404).json({ error: 'Dealership not found' });
        }

        const { make, model } = req.body;
        if (!make || !model) {
            return res.status(400).json({ error: 'Make and model are required' });
        }

        const car = await dealership.createCar({ make, model });
        res.status(201).json(car);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Get all dealerships sorted by car count
router.get('/', async (req, res) => {
    try {
        const dealerships = await db.Dealership.findAll({
            attributes: [
                'id',
                'name',
                'address',
                'description',
                [db.sequelize.fn('COUNT', db.sequelize.col('Cars.id')), 'carCount']
            ],
            include: [{
                model: db.Car,
                attributes: []
            }],
            group: ['Dealership.id'],
            order: [[db.sequelize.literal('carCount'), 'DESC']],
        });

        res.json(dealerships);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Get dealership details
router.get('/:id', async (req, res) => {
    try {
        const dealership = await db.Dealership.findByPk(req.params.id, {
            include: [
                {
                    model: db.User,
                    attributes: ['username', 'email']
                },
                {
                    model: db.Car,
                    include: [
                        {
                            model: db.Feature,
                            attributes: ['name']
                        },
                        {
                            model: db.Rating,
                            include: [{
                                model: db.User,
                                attributes: ['username']
                            }]
                        }
                    ]
                }
            ],
        });

        if (!dealership) {
            return res.status(404).json({ error: 'Dealership not found' });
        }

        const result = {
            ...dealership.toJSON(),
            Cars: dealership.Cars.map(car => ({
                ...car,
                averageRating: car.Ratings.length > 0
                    ? car.Ratings.reduce((sum, rating) => sum + rating.rate, 0) / car.Ratings.length
                    : 0,
                Ratings: car.Ratings.map(rating => ({
                    username: rating.User.username,
                    rate: rating.rate
                }))
            }))
        };

        res.json(result);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;