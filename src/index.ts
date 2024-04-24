import express from 'express';
import http from 'http';
import dotenv from 'dotenv';

dotenv.config();

import connectDB from './config/database';
import applyCors from './config/cors';

const app: express.Application = express();
let PORT = process.env.PORT || 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

applyCors(app);

const server = http.createServer(app);
server.listen(PORT, () => console.log(`🚀 Server is running on http://localhost:${PORT}/`));

connectDB();
