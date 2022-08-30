# @lough/git-changelog

> lough git changelog.



## Usage

```javascript
const gitChangeLog = new GitChangeLog({
  rootPath: options.projectPath,
  repo: options.repo,
  tagFilter: { match: options.tagMatch },
  logFilter: { changedDirOrFile: options.changedDir }
});

// 创建用户日志
gitChangeLog.createUserLog()
// 创建开发日志
gitChangeLog.createDevelopLog()
```



## API

```typescript
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
   * @example '*http*'
   */
  tagFilter?: string;
  /**
   * 日志筛选项（改变的目录或文件）
   * @example 'packages/cli'
   */
  logFilter?: string;
}
```

