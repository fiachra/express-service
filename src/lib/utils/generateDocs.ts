import fs from 'fs';

import YAML from 'yaml';

import { generateSpec } from './generateSpec';

async function main() {
  const swaggerSpec = generateSpec();

  fs.writeFileSync('./openapi/openapi-spec.json', JSON.stringify(swaggerSpec, null, 2));
  fs.writeFileSync('./openapi/openapi-spec.yaml', YAML.stringify(swaggerSpec, null, 2));
}

main();
