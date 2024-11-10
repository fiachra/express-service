// src/index.js
import cookieParser from 'cookie-parser';
import cors from 'cors';
import dotenv from 'dotenv';
import express, { Express } from 'express';
import helmet from 'helmet';
import swaggerUi from 'swagger-ui-express';
import { ExpressAuth } from "@auth/express"
import config from 'config';

import { generateSpec } from './lib/utils';
import { errorHandler } from './middleware/error-handling';
import morganMiddleware from './middleware/morgan';
import system from './routes/system';

dotenv.config();

const corsOptions = {
  origin: function (origin: string | undefined, callback: Function) {
    if (origin) {
      // Echo back the origin sent by the client
      callback(null, origin);
    } else {
      // Handle the case where the origin is not provided (like server-to-server requests)
      callback(null, true);
    }
  },
  credentials: true, // Enable credentials
  optionsSuccessStatus: 200,
};

const app: Express = express();

app.use(cors(corsOptions));
app.use(morganMiddleware);
app.use(helmet());
app.use(cookieParser());


app.use(express.json());

if(config.get('publicApiDocs')) {
  const apiSpec = generateSpec();
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(apiSpec));
}

app.use('/system', system);

app.use(errorHandler);

export default app;
