import NpmOperate from '@lough/npm-operate';
import execa from 'execa';
import path from 'path';
import { GIT_LOG_FORMAT_FIELD } from '../constants/log';
import { GitLog } from '../typings/log';

/**
 * 读取 package.json 获取生成所需配置
 *
 * lerna 多包 逻辑
 * 无需区分包路径，lerna 多包也需要分别在各个 package 里面 加入命令 lough-git log
 * 所以直接通过 process.cwd() package.json 拿到相关数据 并且找到属于当前包的 commit log
 * 非 lerna 包无需判断是否是当前包的提交
 */

// log 输出后 将进行
// 判断当前版本 对比 commit tag版本
// CHANGELOG.md

const action = async () => {
  const projectPath = path.join('E:', 'City', 'lyrical');

  const npmOperate = new NpmOperate({ rootPath: projectPath });

  // TODO: 指定版本 指定lerna项目 指定

  for (const packageName of Object.keys(npmOperate.packages)) {
    const { dirName, relativeDir } = npmOperate.packages[packageName];

    const tags = execa
      .commandSync('git tag', { cwd: projectPath })
      .stdout.split('\n')
      .filter(v => v.includes(packageName));

    const { stdout } = execa.commandSync(
      `git log --date=iso --format=${JSON.stringify(GIT_LOG_FORMAT_FIELD)}, ${tags[tags.length - 1]}...${
        tags[tags.length - 2]
      } -- ${relativeDir}/${dirName} `,
      {
        cwd: projectPath
      }
    );

    const logList: Array<GitLog> = JSON.parse(
      `[${stdout
        .substring(0, stdout.length - 1)
        .replace(/"[^"]*":"[^"]*(\n)[^"]*"/g, ($0, $1) => $0.replace(/\n/g, '\\n'))}]`
    );

    console.log(packageName, logList);

    break;
  }

  // const { stdout } = execa.commandSync(
  //   `git log --date=iso --format=${JSON.stringify(
  //     GIT_LOG_FORMAT_FIELD
  //   )}, @lyrical/http@0.0.8...@lyrical/http@0.0.7 -- packages/http `,
  //   {
  //     cwd: projectPath
  //   }
  // );

  // const logList: Array<GitLog> = JSON.parse(
  //   `[${stdout
  //     .substring(0, stdout.length - 1)
  //     .replace(/"[^"]*":"[^"]*(\n)[^"]*"/g, ($0, $1) => $0.replace(/\n/g, '\\n'))}]`
  // );

  // logList.forEach(log => {
  //   if (!log.originSubject) return;

  //   const result = /^([a-z]*)(?:\(([^)]*)\))?: (.*)$/.exec(log.originSubject);
  //   if (!result) return;

  //   const [_originSubject, type, scope, subject] = result;

  //   log.type = type || '';
  //   log.scope = scope || '';
  //   log.subject = subject || '';
  // });

  // console.log(logList);

  // const logGroupByType = logList.reduce((prev, current) => {
  //   if (!prev[current.type]) prev[current.type] = [];

  //   prev[current.type].push(current);

  //   return prev;
  // }, {});

  // console.log(1111111111, logGroupByType);
};

export default {
  command: 'log',
  description: 'create git commit log.',
  action
};
