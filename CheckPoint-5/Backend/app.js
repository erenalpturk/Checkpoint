const express = require('express');
const app = express();
const cors = require('cors');
const { Pool } = require('pg');
require('dotenv').config();


const connectionString = process.env.CONNECTION_URL;
const pool = new Pool({ connectionString });
let client;

async function connectDB() {
    client = await pool.connect();
    console.log('Successfully connected to db!');
}

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.post('/createCar', async (req, res) => {
    const { carName } = req.body;
    console.log(carName);
    try {
        const query = `
        INSERT INTO cars (carName)
        VALUES ($1)
        RETURNING *
        `;
        const result = await pool.query(query, [carName]);
        if (result.rows.length === 1) {
            const user = result.rows[0];
            res.json({ userId: user.userid, username: user.username });
            console.log('Successfully created car!');
        } else {
            res.status(401).json({ message: 'Invalid credentials' });
        }
    } catch (error) {
        console.error('Error logging in', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});
app.delete('/deleteCar', async (req, res) => {
    const { carName } = req.body;
    try {
        const query = `
        DELETE FROM cars
        WHERE carName = $1
        RETURNING *
        `;
        const result = await pool.query(query, [carName]);

        if (result.rows.length === 1) {
            res.json({ message: 'Car deleted successfully' });
        } else {
            res.status(404).json({ message: 'Car not found' });
        }
    } catch (error) {
        console.error('Error deleting car', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});
app.post('/deletePerson', async (req, res) => {
    const { fullName } = req.body;
    console.log(fullName);
    try {
        const query = `
        DELETE FROM persons
        WHERE fullname = $1
        RETURNING *
        `;
        const result = await pool.query(query, [fullName]);
        if (result.rows.length === 1) {
            const user = result.rows[0];
            res.json({ userId: user.userid, username: user.username });
            console.log('Successfully created person!');
        } else {
            res.status(401).json({ message: 'Invalid credentials' });
        }
    } catch (error) {
        console.error('Error logging in', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});
app.post('/createPerson', async (req, res) => {
    const { fullName } = req.body;
    console.log(fullName);
    try {
        const query = `
        INSERT INTO persons (fullName)
        VALUES ($1)
        RETURNING *
        `;
        const result = await pool.query(query, [fullName]);
        if (result.rows.length === 1) {
            const user = result.rows[0];
            res.json({ userId: user.userid, username: user.username });
            console.log('Successfully created person!');
        } else {
            res.status(401).json({ message: 'Invalid credentials' });
        }
    } catch (error) {
        console.error('Error logging in', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});
app.get('/getAllCars', (req, res) => {
    pool.query('SELECT * FROM cars ORDER BY id;', (error, result) => {
        if (error) {
            console.error('Error executing query:', error);
            res.status(500).json({ error: 'An error occurred while fetching players' });
        } else {
            res.json(result.rows);
        }
    });
});
app.post('/sellCars', async (req, res) => {
    const { ownerId, carId } = req.body;
    console.log(carId, ownerId);
    try {
        const query = `
    UPDATE cars SET owner_id = $1 WHERE id = $2 RETURNING *`;
        const result = await pool.query(query, [ownerId, carId]);
        if (result.rows.length === 1) {
            const user = result.rows[0];
            res.json({ userId: user.userid, username: user.username });
            console.log('Successfully selled car!', user);
        } else {
            res.status(401).json({ message: 'Invalid credentials' });
        }
    } catch (error) {
        console.error('Error logging in', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

app.get('/getAllOwners', (req, res) => {
    pool.query('SELECT c.carname, p.fullname FROM cars c LEFT JOIN persons p ON c.owner_id = p.id WHERE c.owner_id IS NOT NULL ORDER BY c.id;', (error, result) => {
        if (error) {
            console.error('Error executing query:', error);
            res.status(500).json({ error: 'An error occurred while fetching owners' });
        } else {
            res.json(result.rows);
        }
    });
});





const PORT = 3050;
app.listen(PORT, () => {
    connectDB();
    console.log(`Server is running on http://localhost:${PORT}`);
});