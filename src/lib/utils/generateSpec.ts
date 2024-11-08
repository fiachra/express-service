import fs from 'fs';

import { Case } from 'change-case-all';
import config from 'config';
import swaggerJsdoc from 'swagger-jsdoc';

import pk from '../../../package.json';

export const generateSpec = () => {
  const swaggerOptions = {
    swaggerDefinition: {
      openapi: '3.0.0',
      info: {
        title: Case.capital(pk.name || 'title'),
        version: pk.version || '0.0.0',
        description: pk.description || 'Description',
      },
      components: {
        securitySchemes: {
          bearerAuth: {
            type: 'http',
            scheme: 'bearer',
            bearerFormat: 'JWT',
          },
        },
      },
      servers: [
        {
          url: `https://${config.get('url')}`,
          description: 'Server',
        },
      ],
    },
    apis: ['src/routes/**/*.ts'], // Replace with the path to your route handlers file
  };

  const swaggerSpec = swaggerJsdoc(swaggerOptions);
  const schemas = JSON.parse(fs.readFileSync('./openapi/json-schema.json', 'utf8'));
  // @ts-expect-error components not there
  swaggerSpec.components.schemas = schemas.definitions;

  return swaggerSpec;
};
