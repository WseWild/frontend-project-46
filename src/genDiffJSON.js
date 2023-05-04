import sortBy from 'lodash.sortby';

const genDiff = (file1, file2) => {
  const result = [];
  const [file1arr, file2arr] = [Object.entries(file1), Object.entries(file2)];
  file1arr.forEach(([key, value]) => {
    if (Object.prototype.hasOwnProperty.call(file2, key)) {
      if (file1[key] === file2[key]) {
        result.push({ string: `${key}: ${value}`, ident: '  ', file: 1 });
      } else {
        result.push(
          { string: `${key}: ${file1[key]}`, ident: '- ', file: 1 },
          { string: `${key}: ${file2[key]}`, ident: '+ ', file: 2 },
        );
      }
    } else {
      result.push(
        { string: `${key}: ${file1[key]}`, ident: '- ', file: 1 },
      );
    }
  });

  file2arr.forEach(([key, value]) => {
    if (!Object.prototype.hasOwnProperty.call(file1, key)) {
      result.push({ string: `${key}: ${value}`, ident: '+ ', file: 2 });
    }
  });

  const sorted = sortBy(result, ['file', 'string']);
  return `{\n${sorted.map((str) => `  ${str.ident}${str.string}`).join('\n')}\n}`;
};

export default genDiff;
