import yaml from 'js-yaml';
import * as fs from 'fs';
import path from 'path';

const retrieveFileContent = (...filePaths) => {
  const result = filePaths.map((filePath) => {
    const fileContent = fs.readFileSync(filePath, 'utf8');
    const format = path.extname(filePath);
    if (format === '.json') {
      return JSON.parse(fileContent);
    } if (format === '.yaml' || format === '.yml') {
      return yaml.load(fileContent);
    }
    throw new Error(`Unsupported file format: ${format}`);
  });
  return result;
};

export default retrieveFileContent;
