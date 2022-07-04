import NpmOperate from '@lough/npm-operate';
import GitOperate from '@lough/git-operate';
import path from 'path';

/**
 * 读取 package.json 获取生成所需配置
 *
 * lerna 多包 逻辑
 * 无需区分包路径，lerna 多包也需要分别在各个 package 里面 加入命令 lough-git log
 * 所以直接通过 process.cwd() package.json 拿到相关数据 并且找到属于当前包的 commit log
 * 非 lerna 包无需判断是否是当前包的提交
 */

// log 输出后 将进行
// 判断当前版本 对比 commit tag版本
// CHANGELOG.md

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

const action = async () => {
  const projectPath = path.join('W:', 'City', 'lyrical', 'lyrical');

  const npm = new NpmOperate({ rootPath: projectPath });

  const git = new GitOperate({ rootPath: projectPath });

  if (!npm.isLernaProject) {
    //  TODO: 按照标签分组
    // git.tag

    const logList = git.log();

    // 用户日志 开发日志
    // render markdown
  }

  // for (const packageName of Object.keys(npmOperate.packages)) {
  //   const { dirName, relativeDir } = npmOperate.packages[packageName];

  //   const tags = execa
  //     .commandSync('git tag', { cwd: projectPath })
  //     .stdout.split('\n')
  //     .filter(v => v.includes(packageName));

  //   const { stdout } = execa.commandSync(
  //     `git log --date=iso --format=${JSON.stringify(GIT_LOG_FORMAT_FIELD)}, ${tags[tags.length - 1]}...${
  //       tags[tags.length - 2]
  //     } -- ${relativeDir}/${dirName} `,
  //     {
  //       cwd: projectPath
  //     }
  //   );

  //   const logList: Array<GitLog> = JSON.parse(
  //     `[${stdout
  //       .substring(0, stdout.length - 1)
  //       .replace(/"[^"]*":"[^"]*(\n)[^"]*"/g, ($0, $1) => $0.replace(/\n/g, '\\n'))}]`
  //   );

  //   console.log(packageName, logList);

  //   break;
  // }
};

export default {
  command: 'log',
  description: 'create git commit log.',
  action
};
