import execa from 'execa';
import fs from 'fs';
import lough from '../config/lough';
import { GIT_LOG_FORMAT_FIELD } from '../constants/log';
import { PACKAGE_MANAGE_TOOL } from '../constants/npm';
import { GitLog } from '../typings/log';
import { getPackageManageTool } from '../utils/npm';

/**
 * 读取 package.json 获取生成所需配置
 *
 * lerna 多包 逻辑
 * 无需区分包路径，lerna 多包也需要分别在各个 package 里面 加入命令 lough-git log
 * 所以直接通过 process.cwd() package.json 拿到相关数据 并且找到属于当前包的 commit log
 * 非 lerna 包无需判断是否是当前包的提交
 */

const action = async () => {
  console.log(111111, process.cwd(), __dirname);
  return;

  const packageManageTool = getPackageManageTool();

  lough.packageManageTool = packageManageTool as PACKAGE_MANAGE_TOOL;
  if (fs.existsSync(`${process.cwd()}/lerna.json`)) lough.isMorePackage = true;

  const { stdout } = execa.commandSync(`git log --date=iso --format=${JSON.stringify(GIT_LOG_FORMAT_FIELD)},`);

  const logList: Array<GitLog> = JSON.parse(
    `[${stdout
      .substring(0, stdout.length - 1)
      .replace(/"[^"]*":"[^"]*(\n)[^"]*"/g, ($0, $1) => $0.replace(/\n"/g, '\\n"'))}]`
  );

  logList.forEach(log => {
    if (!log.originSubject) return;

    const result = /^([a-z]*)(?:\(([^)]*)\))?: (.*)$/.exec(log.originSubject);
    if (!result) return;

    const [_originSubject, type, scope, subject] = result;

    log.type = type || '';
    log.scope = scope || '';
    log.subject = subject || '';
  });

  const logGroupByType = logList.reduce((prev, current) => {
    if (!prev[current.type]) prev[current.type] = [];

    prev[current.type].push(current);

    return prev;
  }, {});

  console.log(1111111111, logGroupByType);
};

export default {
  command: 'log',
  description: 'create git commit log.',
  action
};
