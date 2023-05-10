import { readFile, getFixturePath } from '../utils/utils.js';
import retrieveFileContent from '../utils/parser.js';
import gendiff from '../src/genDiff.js';

test('gendiffJSON', async () => {
  const filepath1 = await getFixturePath('file1.json');
  const filepath2 = await getFixturePath('file2.json');
  const [file1, file2] = retrieveFileContent(filepath1, filepath2);
  const result = await readFile('result.txt');

  expect(gendiff(file1, file2)).toBe(result);
});

test('gendiffYAML', async () => {
  const filepath1 = await getFixturePath('file1.yaml');
  const filepath2 = await getFixturePath('file2.yaml');
  const [file1, file2] = retrieveFileContent(filepath1, filepath2);
  const result = await readFile('result.txt');

  expect(gendiff(file1, file2)).toBe(result);
});

test('should return the correct diff for two empty objects', () => {
  const file1 = {};
  const file2 = {};
  const expected = '{\n}';
  expect(gendiff(file1, file2)).toBe(expected);
});

test('should return the correct diff for an empty object and a non-empty object', () => {
  const file1 = {};
  const file2 = { a: 1 };
  const expected = `{
  + a: 1
}`;
  expect(gendiff(file1, file2)).toBe(expected);
});

test('should return the correct diff for two objects with different types of values', () => {
  const file1 = { a: 1, b: 'hello' };
  const file2 = { a: 'world', b: [1, 2, 3] };
  const expected = `{
  - a: 1
  + a: world
  - b: hello
  + b: 1,2,3
}`;
  expect(gendiff(file1, file2)).toBe(expected);
});
