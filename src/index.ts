import cookieParser from 'cookie-parser';
import express from 'express';
import dotenv from 'dotenv';
import http from 'http';

dotenv.config();

import connectDB from './config/database';
import logger from './helpers/logger';
import applyCors from './config/cors';
import router from './router';

const app: express.Application = express();
let PORT = process.env.PORT || 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());

applyCors(app);

const server = http.createServer(app);
server.listen(PORT, () => logger.info(`Server is running on http://localhost:${PORT}/`));

connectDB();

app.use('/', router());
