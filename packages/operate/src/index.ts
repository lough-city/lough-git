import execa from 'execa';
import GitLog from './log';
import { IGitOperateParameters } from './types';
import { existsGitConfigSync } from './utils';

/**
 * Git 操作类
 */
class GitOperate {
  private options = {} as Required<IGitOperateParameters>;

  log!: GitLog;

  get config() {
    const { stdout } = execa.commandSync('git remote -v');
    const repo = stdout.match(/origin\t(.*?) \(push\)/)?.[1];

    return {
      repo
    };
  }

  constructor({ rootPath = process.cwd() }: IGitOperateParameters = {}) {
    if (!existsGitConfigSync(rootPath)) throw new Error('请先初始化 GIT，或者在 GIT 项目中运行！');

    this.options.rootPath = rootPath;

    this.log = new GitLog(this.options);
  }
}

export * from './constants';
export * from './types';
export default GitOperate;
