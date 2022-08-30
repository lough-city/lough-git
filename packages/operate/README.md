# @lough/git-operate

> lough git operate.



## Usage

`ts` 包就不详述其类型了，其内部都有，简单描述其作用：

```javascript
const git = new GitOperate();

// 获取提交记录
git.log.commit();

// 获取标签记录
git.log.tag();
```



## API

```typescript
/**
 * Git 操作类参数
 */
export interface IGitOperateParameters {
  /**
   * 项目根路径
   * @default process.cwd()
   */
  rootPath?: string;
}
```
