const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const db = require('./models');
const carFeaturesRoutes = require('./routes/carFeatureRoutes');

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Routes
app.use('/api/dealerships', require('./routes/dealershipRoutes'));
app.use('/api/rating', require('./routes/ratingRoutes'));
app.use('/api/cars', carFeaturesRoutes); // Use the updated routes

// Database connection
db.sequelize.sync().then(() => {
    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    });
});
