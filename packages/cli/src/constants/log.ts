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
  subject = '%s',

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
