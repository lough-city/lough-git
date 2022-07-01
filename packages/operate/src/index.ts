import execa from 'execa';
import { existsGitConfigSync } from './utils';
import { GitLog, IGitParameters } from './types';
import { GIT_LOG_FORMAT_FIELD } from './constants';

/**
 * Git 日志筛选项
 */
interface IGitLogFilter {
  /**
   * 改变的目录或文件
   * @example 'packages/cli'
   */
  changedDirOrFile?: string;
}

/**
 * Git 操作类
 */
class GitOperate {
  protected options = {} as Required<IGitParameters>;

  constructor(parameters: IGitParameters) {
    const { rootPath = process.cwd() } = parameters;
    if (!existsGitConfigSync(rootPath)) throw new Error('请先初始化 GIT，或者在 GIT 项目中运行！');

    this.options.rootPath = rootPath;
  }

  log(options?: { filter?: IGitLogFilter }) {
    const commands = ['git', 'log', '--date=iso'];

    if (options.filter.changedDirOrFile) commands.push(options.filter.changedDirOrFile);

    // const { stdout } = execa.commandSync(
    //   `git log --date=iso --format=${JSON.stringify(GIT_LOG_FORMAT_FIELD)}, ${tags[tags.length - 1]}...${
    //     tags[tags.length - 2]
    //   } -- ${relativeDir}/${dirName} `,
    //   {
    //     cwd: this.options.rootPath
    //   }
    // );

    // const logList: Array<GitLog> = JSON.parse(
    //   `[${stdout
    //     .substring(0, stdout.length - 1)
    //     .replace(/"[^"]*":"[^"]*(\n)[^"]*"/g, ($0, $1) => $0.replace(/\n/g, '\\n'))}]`
    // );

    // return logList;
  }
}

export * from './constants';
export * from './types';
export default GitOperate;
