#!/usr/bin/env node
import { program } from 'commander';
import { join } from 'path';
import { readFileSync } from 'fs';
import log from './commands/log';

function start() {
  const jsonPath = join(__dirname, '../package.json');
  const jsonContent = readFileSync(jsonPath, 'utf-8');
  const jsonResult = JSON.parse(jsonContent);
  program.version(jsonResult.version);

  program
    .command(log.command)
    .description(log.description)
    .action(log.action)
    .option('-l, --lerna [boolean]', 'Lerna Project', false);

  program.parseAsync(process.argv);
}

start();
