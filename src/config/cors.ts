import cors, { CorsOptions } from 'cors';
import { Application } from 'express';

const options: CorsOptions = {
  origin: 'http://localhost:3000',
  credentials: true,
};

const applyCors = (app: Application) => {
  app.use(cors(options));
};

export default applyCors;
