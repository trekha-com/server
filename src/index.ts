import { loggerMiddleware } from './middlewares/loggerMiddleware';
import connectDB from './config/database';
import cookieParser from 'cookie-parser';
import logger from './helpers/logger';
import applyCors from './config/cors';
import router from './router';
import express from 'express';
import dotenv from 'dotenv';
import http from 'http';

dotenv.config();

const app: express.Application = express();

const PORT = process.env.PORT || 3000;
const BASE_PATH = process.env.BASE_PATH || '';

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());

applyCors(app);

const server = http.createServer(app);
server.listen(PORT, () => logger.info(`Server is running on http://localhost:${PORT}/${BASE_PATH}`));

connectDB();

app.use(`/${BASE_PATH}`, loggerMiddleware, router());
