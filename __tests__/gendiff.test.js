import { readFile, getFixturePath, retrieveFileContent } from '../utils/utils.js';
import gendiff from '../src/genDiffJSON.js';

test('gendiffJSON', async () => {
  const filepath1 = await getFixturePath('file1.json');
  const filepath2 = await getFixturePath('file2.json');
  const [file1, file2] = retrieveFileContent(filepath1, filepath2);
  const result = await readFile('result.txt');

  expect(gendiff(file1, file2)).toBe(result);
});
