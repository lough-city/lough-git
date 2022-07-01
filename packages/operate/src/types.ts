import { GIT_LOG_FORMAT_FIELD } from './constants';

/**
 * Git 操作类参数
 */
export interface IGitParameters {
  /**
   * 项目根路径
   * @default process.cwd()
   */
  rootPath?: string;
}

type GitLogOrigin = {
  [K in keyof typeof GIT_LOG_FORMAT_FIELD]: string;
};

/**
 * git log
 */
export interface GitLog extends GitLogOrigin {
  /**
   * 类型
   */
  type: string;
  /**
   * 范围
   */
  scope: string;
  /**
   * 主题
   */
  subject: string;
}
