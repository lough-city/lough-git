import GitChangeLog, {
  GIT_CHANGE_LOG_CREATE_FILE_NAME,
  GIT_CHANGE_LOG_TYPE,
  GIT_CHANGE_LOG_TYPE_LABEL
} from '@lough/git-changelog';
import fs from 'fs';
import path from 'path';
import chalk from 'chalk';
import { succeedSpinner, startLoadingSpinner, succeedLoadingSpinner } from '../utils/spinner';

interface IOptions {
  /**
   * 输出日志类型
   */
  outputLogType: Array<GIT_CHANGE_LOG_TYPE>;
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
  /**
   * 是否 lerna 项目
   * @default false
   */
  lerna: boolean;
  /**
   * 标签匹配
   */
  tagMatch?: string;
  /**
   * 提交变更目录
   */
  changedDir?: string;
}

const action = async (options: IOptions) => {
  const gitChangeLog = new GitChangeLog({
    rootPath: options.projectPath,
    repo: options.repo,
    tagFilter: { match: options.tagMatch },
    logFilter: { changedDirOrFile: options.changedDir }
  });

  for (const outputLogType of options.outputLogType) {
    startLoadingSpinner(`${GIT_CHANGE_LOG_TYPE_LABEL[outputLogType]}: 开始生成`);
    const markdown = gitChangeLog.createMarkdown(outputLogType);
    succeedLoadingSpinner(chalk.green(`${GIT_CHANGE_LOG_TYPE_LABEL[outputLogType]}: 生成成功`));
    startLoadingSpinner(`${GIT_CHANGE_LOG_TYPE_LABEL[outputLogType]}: 开始写入`);
    fs.writeFileSync(
      path.join(options.projectPath, `${GIT_CHANGE_LOG_CREATE_FILE_NAME[outputLogType]}.md`),
      markdown,
      'utf8'
    );
    succeedLoadingSpinner(chalk.green(`${GIT_CHANGE_LOG_TYPE_LABEL[outputLogType]}: 写入成功`));
  }

  succeedSpinner(chalk.green('Changelog End.'));
};

export default {
  command: 'changelog',
  description: 'create git commit change log.',
  action
};
