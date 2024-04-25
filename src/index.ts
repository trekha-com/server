import express from 'express';
import http from 'http';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';

dotenv.config();

import connectDB from './config/database';
import applyCors from './config/cors';
import logger from './helpers/logger';
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
