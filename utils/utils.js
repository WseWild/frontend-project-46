import path from 'path';
import * as fs from 'fs';
import yaml from 'js-yaml';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
export const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
export const readFile = (filename) => fs.readFileSync(getFixturePath(filename), 'utf-8');

export const retrieveFileContent = (...filePaths) => {
  const result = filePaths.map((filePath) => {
    const fileContent = fs.readFileSync(filePath, 'utf8');
    if (filePath.endsWith('.json')) {
      return JSON.parse(fileContent);
    } if (filePath.endsWith('.yaml') || filePath.endsWith('.yml')) {
      return yaml.load(fileContent);
    }
    throw new Error(`Unsupported file type: ${filePath}`);
  });
  return result;
};
