const express = require('express');
const cors = require('cors');
require('dotenv').config();
const app = express();
const PORT = process.env.PORT || 3050;
const { Pool } = require('pg');
const connectionString = process.env.CONNECTION_URL;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
const pool = new Pool({ connectionString });
let client;
async function connectDB() {
    client = await pool.connect();
    console.log("Successfully connected to db!");
}

app.listen(PORT, () => {
    connectDB();
    console.log(`Server is running on http://localhost:${PORT}`);
});

app.post('/register', async (req, res) => {
    const { name, password, mail } = req.body;

    try {

        const query = `
          INSERT INTO users (name, password, mail)
          VALUES ($1, $2, $3)
          RETURNING *
        `;

        const result = await client.query(query, [name, password, mail]);

        res.status(201).json({ message: 'User registered successfully', user: result.rows[0] });
    } catch (error) {
        console.error('Error registering user', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

app.post('/login', async (req, res) => {
    const { mail, password } = req.body;
    try {
        const query = `
          SELECT userId, name
          FROM users
          WHERE mail = $1 AND password = $2
        `;

        const result = await pool.query(query, [mail, password]);

        if (result.rows.length === 1) {
            console.log((result.rows[0]));
            const user = result.rows[0];
            res.json({ userId: user.userid, name: user.name });
        } else {
            res.status(401).json({ message: 'Invalid credentials' });
        }
    } catch (error) {
        console.error('Error logging in', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

app.get('/getUser/:userId', async (req, res) => {
    const userId = req.params.userId;

    try {
        const query = `
        SELECT name
        FROM users
        WHERE userId = $1
      `;

        const result = await pool.query(query, [userId]);

        if (result.rows.length === 1) {
            const name = result.rows[0].name;
            res.json({ name });
        } else {
            res.status(404).json({ message: 'User not found' });
        }
    } catch (error) {
        console.error('Error retrieving username', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

app.get('/getAllUser', async (req, res) => {
    try {
        const query = `
            SELECT *
            FROM users
        `;

        const result = await pool.query(query);

        res.json({ users: result.rows });
    } catch (error) {
        console.error('Error', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});
