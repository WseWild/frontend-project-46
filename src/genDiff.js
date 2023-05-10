import sortBy from 'lodash.sortby';

const genDiff = (file1, file2) => {
  const result = [];
  const file1Entries = Object.entries(file1);
  const file2Entries = Object.entries(file2);

  // обработка ключей, которые есть в file1
  file1Entries.forEach(([key, value]) => {
    if (Object.prototype.hasOwnProperty.call(file2, key)) {
      if (file1[key] === file2[key]) {
        result.push(
          {
            key,
            string: `${key}: ${value}`,
            ident: '  ',
            file: 1,
          },
        );
      } else {
        result.push(
          {
            key,
            string: `${key}: ${file1[key]}`,
            ident: '- ',
            file: 1,
          },
          {
            key,
            string: `${key}: ${file2[key]}`,
            ident: '+ ',
            file: 2,
          },
        );
      }
    } else {
      result.push(
        {
          key,
          string: `${key}: ${file1[key]}`,
          ident: '- ',
          file: 1,
        },
      );
    }
  });

  // обработка ключей, которые есть только в file2
  file2Entries.forEach(([key, value]) => {
    if (!Object.prototype.hasOwnProperty.call(file1, key)) {
      result.push(
        {
          key,
          string: `${key}: ${value}`,
          ident: '+ ',
          file: 2,
        },
      );
    }
  });

  const sorted = sortBy(result, ['key', 'file']);

  if (sorted.length === 0) {
    return '{\n}';
  }

  return `{\n${sorted.map((str) => `  ${str.ident}${str.string}`).join('\n')}\n}`;
};

export default genDiff;
