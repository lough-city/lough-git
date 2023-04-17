#!/usr/bin/env node
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';
import { GIT_CHANGE_LOG_TYPE } from '@lough/git-changelog';
import { Package } from '@lough/npm-operate';
import { program } from 'commander';
import log from './commands/changelog';
import init from './commands/init';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

function start() {
  const npm = new Package({ dirName: join(__dirname, '..') });
  program.version(npm.version);

  program.command(init.command).description(init.description).action(init.action);

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
    // .option('-l, --lerna [boolean]', 'Lerna Project', false)
    .option('-t, --tagMatch [string]', 'Tag Match')
    .option('-c, --changedDir [string]', 'Commit Changed Dir');

  program.parseAsync(process.argv);
}

start();
