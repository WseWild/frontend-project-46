#!/usr/bin/env node

import { Command } from 'commander';
import genDiff from './src/genDiff.js';
import retrieveFileContent from './utils/parser.js';

const program = new Command();
program
  .description('Compares two configuration files and shows a difference.')
  .version('1.0.0')
  .arguments('<filepath1> <filepath2>')
  .option('-f, --format <type>', 'output format')
  .action((filepath1, filepath2) => {
    const [file1, file2] = retrieveFileContent(filepath1, filepath2);
    console.log(genDiff(file1, file2));
  });

program.parse();

export default program;
