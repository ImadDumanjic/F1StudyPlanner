require('dotenv').config();
const express = require('express');
const cors = require('cors');   

const { sequelize, User, RaceWeekend, Session, Task } = require('./models');

const app = express();
const PORT = process.env.PORT || 5433;

app.use(cors());
app.use(express.json());

app.listen(PORT, async () => {
    console.log(`Server is running on port ${PORT}`);
    try{
        await sequelize.authenticate();
        console.log("✅ Database connected successfully");
    } catch (error) {
        console.error("❌ Unable to connect to the database:", error);
    }
});

