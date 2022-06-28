import { GIT_LOG_FORMAT_FIELD } from '../constants/log';

type GitLogOrigin = {
  [K in keyof typeof GIT_LOG_FORMAT_FIELD]: string;
};

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
