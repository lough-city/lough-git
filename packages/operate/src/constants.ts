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
   * 构建过程或辅助工具的变动
   */
  chore = 'chore',
  /**
   * 与 CI（持续集成服务）有关的改动
   */
  ci = 'ci',
  /**
   * 代码风格修改
   */
  style = 'style',
  /**
   * 文档
   */
  docs = 'docs',
  /**
   * 测试
   */
  test = 'test',
  /* 工程化 end */

  /* 版本发布 start */
  /**
   * 编译相关的修改，例如版本发布、对项目构建或者依赖的改动
   */
  build = 'build',
  /**
   * 发布
   */
  release = 'release',
  /* 版本发布 end */

  /* 功能特点 start */
  /**
   * 新功能、新特性
   */
  feat = 'feat',
  /**
   * 页面布局与样式
   */
  ui = 'ui',
  /**
   * 重构
   */
  refactor = 'refactor',
  /**
   * 优化相关，比如：提升性能、体验
   */
  perf = 'perf',
  /* 功能特点 end */

  /* 问题修复 start */
  /**
   * 修补BUG
   */
  fix = 'fix',
  /* 问题修复 end */

  /**
   * 未定义
   */
  undefined = 'undefined'
}
