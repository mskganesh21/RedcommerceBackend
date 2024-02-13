import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import { connectDB } from './config/dbConnect.js';
import UserRoutes from './routes/UserRoute.js';
import CloudinaryRoutes from './routes/CloudinaryRoute.js';

dotenv.config();

const app = express();

// app.use(express.urlencoded({extended: true, limit: '500mb'}));
// app.use(express.json());
app.use(bodyParser.json({ limit: '500mb' })); // Use body-parser directly for JSON parsing
app.use(bodyParser.urlencoded({ extended: true, limit: '500mb' })); // Use body-parser directly for URL-encoded data



app.use(cors());

app.use(morgan('tiny'));

app.disable('x-powered-by'); 

app.get('/', (req, res) => {
    res.status(201).json("Home GET Request");
});

app.use('/api/user', UserRoutes);
app.use('/api/cloudinary', CloudinaryRoutes);

const port = process.env.PORT;

connectDB();

app.listen(port, () => {
    console.log(`server running on ${port}`);
});