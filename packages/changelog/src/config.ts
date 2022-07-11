enum GIT_COMMIT_TYPE {
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
  fix = 'fix'
  /* 问题修复 end */
}

const config = {
  types: {
    [GIT_COMMIT_TYPE.chore]: {
      section: '🚀 Chore | 构建/工程依赖/工具'
    },
    [GIT_COMMIT_TYPE.ci]: {
      section: '👷 Continuous Integration | CI 配置'
    },
    [GIT_COMMIT_TYPE.style]: {
      section: '💄 Styles | 样式'
    },
    [GIT_COMMIT_TYPE.docs]: {
      section: '📝 Documentation | 文档'
    },
    [GIT_COMMIT_TYPE.test]: {
      section: '✅ Tests | 测试'
    },

    [GIT_COMMIT_TYPE.build]: {
      section: '📦‍ Build System | 打包构建'
    },
    [GIT_COMMIT_TYPE.release]: {
      section: '🚍 release | CI 配置'
    },

    [GIT_COMMIT_TYPE.feat]: {
      section: '✨ Features | 新功能'
    },
    [GIT_COMMIT_TYPE.ui]: {
      section: '🎨 UI | UI 界面'
    },
    [GIT_COMMIT_TYPE.refactor]: {
      section: '♻️ Code Refactoring | 代码重构'
    },
    [GIT_COMMIT_TYPE.perf]: {
      section: '⚡ Performance Improvements | 性能优化'
    },

    [GIT_COMMIT_TYPE.fix]: {
      section: '🐛 Bug Fixes | Bug 修复'
    }
  }
};

export default config;
