import cors, { CorsOptions } from 'cors';
import { Application } from 'express';

const options: CorsOptions = {
  origin: '*',
};

const applyCors = (app: Application) => {
  app.use(cors(options));
};

export default applyCors;
