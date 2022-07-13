import GitChangeLog from '@lough/git-changelog';

interface IOptions {
  /**
   * 是否 lerna 项目
   * @default false
   */
  lerna: boolean;
  /**
   * 项目根路径
   * @default process.cwd()
   */
  projectPath: string;
  /**
   * 仓库地址
   * @default 通过 `git remote -v` 获取
   */
  repo?: string;
}

// TODO: 提取变量

const action = async (_arguments: any, options: IOptions) => {
  if (options.lerna) {
    const gitChangeLog = new GitChangeLog({
      rootPath: options.projectPath,
      repo: options.repo,
      tagFilter: { match: '*react*' },
      logFilter: { changedDirOrFile: 'packages/react' }
    });

    gitChangeLog.createUserLog();
    gitChangeLog.createDevelopLog();
  } else {
    const gitChangeLog = new GitChangeLog({
      rootPath: options.projectPath,
      repo: options.repo
    });

    gitChangeLog.createUserLog();
    gitChangeLog.createDevelopLog();
  }
};

export default {
  command: 'log',
  description: 'create git commit log.',
  action
};
