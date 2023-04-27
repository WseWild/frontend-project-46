#!/usr/bin/env node

import { Command } from 'commander';
import sortBy from 'lodash.sortby';
import * as fs from 'fs';

const program = new Command();
program
  .description('Compares two configuration files and shows a difference.')
  .version('1.0.0')
  .argument('<filepath1>')
  .argument('<filepath2>')
  .option('-f, --format <type>', 'output format')
  .action((filepath1, filepath2) => {
    const [file1, file2] = [
      JSON.parse(fs.readFileSync(filepath1).toString()),
      JSON.parse(fs.readFileSync(filepath2).toString()),
    ];
    const result = [];
    const file1arr = Object.entries(file1);
    const file2arr = Object.entries(file2);

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
    console.log(`{\n${sorted.map((str) => `  ${str.ident}${str.string}`).join('\n')}\n}`);
  });

program.parse();
