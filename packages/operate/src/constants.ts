/**
 * Git 日志字段
 */
export enum GIT_LOG_FORMAT_FIELD {
  /**
   * commit hash
   */
  hash = '%H',

  /**
   * abbreviated commit hash
   */
  abbrevHash = '%h',

  /**
   * tree hash
   */
  treeHash = '%T',

  /**
   * abbreviated tree hash
   */
  abbrevTreeHash = '%t',

  /**
   * parent hashes
   */
  parentHashes = '%P',

  /**
   * abbreviated parent hashes
   */
  abbrevParentHashes = '%p',

  /**
   * author name
   */
  authorName = '%an',

  /**
   * author email
   */
  authorEmail = '%ae',

  /**
   * author date (format respects --date= option)
   */
  authorDate = '%ad',

  /**
   * author date, relative
   */
  authorDateRelative = '%ar',

  /**
   * author date, UNIX timestamp
   */
  authorDateTimestamp = '%at',

  /**
   * committer name
   */
  committerName = '%cn',

  /**
   * committer email
   */
  committerEmail = '%ce',

  /**
   * committer date (format respects --date= option)
   */
  committerDate = '%cd',

  /**
   * committer date, relative
   */
  committerDateRelative = '%cr',

  /**
   * committer date, UNIX timestamp
   */
  committerDateTimestamp = '%ct',

  /**
   * ref names, like the --decorate option of git-log[1]
   */
  decorate = '%d',

  /**
   * encoding
   */
  encoding = '%e',

  /**
   * subject
   */
  originSubject = '%s',

  /**
   * sanitized subject line, suitable for a filename
   */
  sanitizedSubject = '%f',

  /**
   * body
   */
  body = '%b',

  /**
   * commit notes
   */
  notes = '%N'
}

/**
 * Git 提交类型
 */
export enum GIT_COMMIT_TYPE {
  /* 工程化 start */
  /**
   * 事务
   * @description 变动事务，改动其他不影响代码的事务
   */
  chore = 'chore',
  /**
   * 脚本
   * @description 更新脚本，改动CI或执行脚本配置
   */
  ci = 'ci',
  /**
   * 样式
   * @description 变动格式，不影响代码逻辑
   */
  style = 'style',
  /**
   * 文档
   * @description 更新文档，仅修改文档不修改代码
   */
  docs = 'docs',
  /**
   * 测试
   * @description 新增测试，追加测试用例验证代码
   */
  test = 'test',
  /* 工程化 end */

  /* 功能特点 start */
  /**
   * 新功能、新特性
   */
  /**
   * 功能
   * @description 新增功能，迭代项目需求
   */
  feat = 'feat',
  /**
   * 重构
   * @description 重构代码，非新增功能也非修复缺陷
   */
  refactor = 'refactor',
  /**
   * 性能
   * @description 优化性能，提高代码执行性能
   */
  perf = 'perf',
  /* 功能特点 end */

  /* 版本发布 start */
  /**
   * 构建
   * @description 更新构建，改动构建工具或外部依赖
   */
  build = 'build',
  /**
   * 发布
   * @description 发布版本，版本的发布及其标记
   */
  release = 'release',
  /* 版本发布 end */

  /* 问题修复 start */
  /**
   * 修复
   * @description 修复缺陷，修复上一版本存在问题
   */
  fix = 'fix',
  /* 问题修复 end */

  /**
   * 未定义
   */
  undefined = 'undefined'
}
