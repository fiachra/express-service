// src/index.js
import config from 'config';

import app from './app';
import { logger } from './lib/logger';

const port = config.get('port') || 3000;

const server = app.listen(port, () => {
  logger.info(`[server]: Server is running at http://localhost:${port}`);
});

export default app;
