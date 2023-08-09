const express = require('express');
const app = express();
const connectDB = require('./db/connect');
const cors = require('cors');
require('dotenv').config();

app.use(cors({
    origin: 'http://localhost:5173'
}));


// routes
const authRouter = require('./routes/auth');
const gameRouter = require('./routes/games');


// Middleware
app.use(express.json());

// Routes
app.use('/api/v1/auth', authRouter);
app.use('/api/v1/games', gameRouter);

// Default route

app.get('/api/v1', (req, res) => {
    res.send('11');
})

// Start the server
function start() {
    const port = process.env.PORT || 3000;
    connectDB()
        .then(() => {
            app.listen(port, () => {
                console.log(`Server is listening on port ${port}...`);
            });
        })
        .catch((error) => {
            console.error('Error connecting to MongoDB:', error);
            process.exit(1);
        });
}

start();
