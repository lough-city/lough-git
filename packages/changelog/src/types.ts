import { IGitLogFilter, IGitTagFilter } from '@lough/git-operate';

/**
 * Git ChangeLog 类参数
 */
export interface IGitChangeLogParameters {
  /**
   * 仓库地址
   * @default 通过 `git remote -v` 获取
   */
  repo?: string;
  /**
   * 项目根路径
   * @default process.cwd()
   */
  rootPath?: string;
  /**
   * 下一个版本
   * @default 'HEAD'
   */
  nextVersion?: string;
  /**
   * 标签筛选项
   */
  tagFilter?: Pick<IGitTagFilter, 'match'>;
  /**
   * 日志筛选项
   */
  logFilter?: Pick<IGitLogFilter, 'changedDirOrFile'>;
}
