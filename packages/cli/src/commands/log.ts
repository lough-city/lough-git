import path from 'path';
import GitChangeLog from '@lough/git-changelog';
import fs from 'fs';

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

// 结合 merge 类型和 issues 类型进行对应归类

const action = async () => {
  const projectPath = path.join('E:', 'City', 'lough', 'lough-npm');

  const gitChangeLog = new GitChangeLog({ rootPath: projectPath });

  // gitChangeLog.createUserLog();
  gitChangeLog.createDevelopLog();
};

export default {
  command: 'log',
  description: 'create git commit log.',
  action
};
