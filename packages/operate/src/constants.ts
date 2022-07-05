/**
 * git log  字段
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
 * 工程化
 */
const ENGINEERING = {
  /**
   * 构建过程或辅助工具的变动
   */
  chore: 'chore',
  /**
   * 与 CI（持续集成服务）有关的改动
   */
  ci: 'ci',
  /**
   * 代码风格修改
   */
  style: 'style',
  /**
   * 文档
   */
  docs: 'docs',
  /**
   * 测试
   */
  test: 'test'
};

/**
 * 版本发布
 */
const RELEASE = {
  /**
   * 编译相关的修改，例如版本发布、对项目构建或者依赖的改动
   */
  build: 'build',
  /**
   * 发布
   */
  release: 'release'
};

/**
 * 开发日志提交类型
 */
export const developCommitTypeList = [...Object.keys(ENGINEERING), ...Object.keys(RELEASE)];

/**
 * 功能
 */
const FEATURE = {
  /**
   * 新功能、新特性
   */
  feat: 'feat',
  /**
   * 页面布局与样式
   */
  ui: 'ui',
  /**
   * 重构
   */
  refactor: 'refactor',
  /**
   * 优化相关，比如：提升性能、体验
   */
  perf: 'perf'
};

/**
 * BUG 修复
 */
const BUG_FIX = {
  /**
   * 修补BUG
   */
  fix: 'fix'
};

/**
 * 用户日志提交类型
 */
export const userCommitTypeList = [...Object.keys(FEATURE), ...Object.keys(BUG_FIX)];
