/**
 * Git ChangeLog 类参数
 */
export interface IGitChangeLogParameters {
  /**
   * 仓库
   */
  repo?: string;
  /**
   * 项目根路径
   * @default process.cwd()
   */
  rootPath?: string;
  /**
   * 下一个版本
   * @default 'Unreleased'
   */
  nextVersion?: string;
}
