import { existsGitConfigSync } from './utils';
import { IGitParameters } from './types';
import GitLog from './log';

/**
 * Git 操作类
 */
class GitOperate {
  protected options = {} as Required<IGitParameters>;

  private log!: GitLog;

  constructor(parameters: IGitParameters) {
    const { rootPath = process.cwd() } = parameters;

    if (!existsGitConfigSync(rootPath)) throw new Error('请先初始化 GIT，或者在 GIT 项目中运行！');

    this.options.rootPath = rootPath;

    this.log = new GitLog(this.options);
  }
}

export * from './constants';
export * from './types';
export default GitOperate;
