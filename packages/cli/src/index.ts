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

  program.command(log.command).description(log.description).action(log.action);

  program.parseAsync(process.argv);
}

// log 输出后 将进行
// 判断当前版本 对比 commit tag版本
// CHANGELOG.md

start();
