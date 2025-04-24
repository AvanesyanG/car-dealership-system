# 🚗 Car Dealership System

A Node.js-based backend system for managing a car dealership, including inventory, customer, and sales data. This application leverages Sequelize ORM for database interaction and supports environment-based configuration.

---

## 🛠️ Technologies Used

- **Node.js** – JavaScript runtime
- **Express** – Web framework for building the API
- **Sequelize** – ORM for interacting with MySQL
- **MySQL2** – MySQL client for Node.js
- **dotenv** – Environment variable management
- **CORS** – Middleware for handling cross-origin requests
- **body-parser** – Middleware for parsing incoming request bodies
- **sequelize-cli** – Command-line interface for Sequelize

---

## ⚙️ Setup Instructions
1. Clone the repository:

   ```bash
   git clone https://github.com/AvanesyanG/car-dealership-system.git
   cd car-dealership-system
   
2. Install dependencies:
     ```bash
    npm install
3. Set up environment variables:
   Create a .env file in the root folder and add your database configuration values.

   DB_USERNAME=your_mysql_username
   DB_PASSWORD=your_mysql_password
   DB_NAME=car_dealership
   DB_HOST=localhost
   DB_DIALECT=mysql

4. The database configuration in config/config.js is already set up to use the environment variables defined in your .env file.
5. Run database migrations and seeders:
    ```bash
    npx sequelize-cli db:migrate
    npx sequelize-cli db:seed:all
6. Start the development server:
    ```bash
   node server.js

