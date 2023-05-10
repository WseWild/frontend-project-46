import path from 'path';
import * as fs from 'fs';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
export const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
export const readFile = (filename) => fs.readFileSync(getFixturePath(filename), 'utf-8');
