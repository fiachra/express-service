import express, { Request, Response, NextFunction } from 'express';

import pk from '../../package.json';

const router = express();

/**
 * @swagger
 * /health:
 *   get:
 *     summary: Get system health
 *     description: Simple Liveness probe
 *     responses:
 *       200:
 *         description: System is up
 *       400:
 *         description: Bad request, Not up yet
 */
router.get('/health', async (req: Request, res: Response, next: NextFunction) => {
  res.json({ result: 'ok' });
});

/**
 * @swagger
 * /version:
 *   get:
 *     summary: Get system version
 *     description: Return the current service version
 *     responses:
 *       200:
 *         description: version info.
 *       400:
 *         description: Bad request, missing snapshot name or file.
 */
router.get('/version', async (req: Request, res: Response, next: NextFunction) => {
  res.json({
    result: {
      version: pk.version,
    },
  });
});

export default router;
