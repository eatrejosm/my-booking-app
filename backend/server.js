import express from 'express';
import dotenv from 'dotenv';
import dbConnection from './config/dbConnection.js';
import colors from 'colors';
import userRoutes from './routes/userRoutes.js';
// const cors=require('cors');
import cors from 'cors';

dotenv.config();

dbConnection();

const app = express();
app.use(express.json());

app.use(cors());
app.get('/', (req, res) => {
    res.send('API is running...');
});

app.use('/api/v1/users', userRoutes);



const PORT = process.env.PORT || 5001;

app.listen(PORT, console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold));