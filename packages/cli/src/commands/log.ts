import execa from 'execa';
import { GIT_LOG_FORMAT_FIELD } from '../constants/log';
import { GitLog } from '../typings/log';

/**
 * 读取 package.json 获取生成所需配置
 */

const action = async () => {
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
