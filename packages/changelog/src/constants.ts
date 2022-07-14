/**
 * Git ChangeLog 类型
 */
export enum GIT_CHANGE_LOG_TYPE {
  /**
   * 用户
   */
  user = 'user',
  /**
   * 开发
   */
  develop = 'develop'
}

/**
 * Git ChangeLog 类型标签
 */
export enum GIT_CHANGE_LOG_TYPE_LABEL {
  /**
   * 用户日志
   */
  user = '用户日志',
  /**
   * 开发日志
   */
  develop = '开发日志'
}

/**
 * Git ChangeLog 创建文件名
 */
export enum GIT_CHANGE_LOG_CREATE_FILE_NAME {
  /**
   * 用户日志
   */
  user = 'CHANGELOG',
  /**
   * 开发日志
   */
  develop = 'DEVLOG'
}
