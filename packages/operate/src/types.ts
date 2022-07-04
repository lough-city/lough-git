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

/**
 * 原始 git log
 */
export type IGitLogOrigin = {
  [K in keyof typeof GIT_LOG_FORMAT_FIELD]: string;
};

/**
 * git log
 */
export interface IGitLog extends IGitLogOrigin {
  /**
   * 类型
   */
  type?: string;
  /**
   * 范围
   */
  scope?: string;
  /**
   * 主题
   */
  subject?: string;
}

/**
 * Git 日志筛选项
 */
export interface IGitLogFilter {
  /**
   * 改变的目录或文件
   * @example 'packages/cli'
   */
  changedDirOrFile?: string;
  /**
   * 从哪个 tag 开始
   */
  fromTag?: string;
  /**
   * 到哪个 tag 结束
   */
  toTag?: string;
}

/**
 * Git 标签筛选项
 */
export interface IGitTagFilter {
  /**
   * 匹配标签
   * @example '*http*'
   */
  match?: string;
}
