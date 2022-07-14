#!/usr/bin/env node
import { program } from 'commander';
import { join } from 'path';
import { readFileSync } from 'fs';
import log from './commands/changelog';
import { GIT_CHANGE_LOG_TYPE } from '@lough/git-changelog';

function start() {
  const jsonPath = join(__dirname, '../package.json');
  const jsonContent = readFileSync(jsonPath, 'utf-8');
  const jsonResult = JSON.parse(jsonContent);
  program.version(jsonResult.version);

  program
    .command(log.command)
    .description(log.description)
    .action(log.action)
    .option(
      '-o, --outputLogType [string...]',
      `Output Log Type: Array<${Object.keys(GIT_CHANGE_LOG_TYPE).join(' | ')}>`,
      Object.keys(GIT_CHANGE_LOG_TYPE)
    )
    .option('-p, --projectPath [string]', 'Project Root Path', process.cwd())
    .option('-r, --repo [string]', 'Repository')
    .option('-l, --lerna [boolean]', 'Lerna Project', false)
    .option('-t, --tagMatch [string]', 'Tag Match')
    .option('-c, --changedDir [string]', 'Commit Changed Dir');

  program.parseAsync(process.argv);
}

start();
