import { GIT_COMMIT_TYPE } from '@lough/git-operate';
import { GIT_CHANGE_LOG_TYPE } from './constants';

const config: {
  types: {
    [K in GIT_COMMIT_TYPE]: {
      /**
       * 段落标题
       */
      section: string;
      /**
       * 日志类型
       */
      logType?: GIT_CHANGE_LOG_TYPE;
    };
  };
} = {
  types: {
    [GIT_COMMIT_TYPE.chore]: {
      logType: GIT_CHANGE_LOG_TYPE.develop,
      section: '🚀 Chore | 构建/工程依赖/工具'
    },
    [GIT_COMMIT_TYPE.ci]: {
      logType: GIT_CHANGE_LOG_TYPE.develop,
      section: '👷 Continuous Integration | CI 配置'
    },
    [GIT_COMMIT_TYPE.style]: {
      logType: GIT_CHANGE_LOG_TYPE.develop,
      section: '💄 Styles | 样式'
    },
    [GIT_COMMIT_TYPE.docs]: {
      logType: GIT_CHANGE_LOG_TYPE.develop,
      section: '📝 Documentation | 文档'
    },
    [GIT_COMMIT_TYPE.test]: {
      logType: GIT_CHANGE_LOG_TYPE.develop,
      section: '✅ Tests | 测试'
    },

    [GIT_COMMIT_TYPE.build]: {
      logType: GIT_CHANGE_LOG_TYPE.develop,
      section: '📦‍ Build System | 打包构建'
    },
    [GIT_COMMIT_TYPE.release]: {
      logType: GIT_CHANGE_LOG_TYPE.develop,
      section: '🚍 release | CI 配置'
    },

    [GIT_COMMIT_TYPE.feat]: {
      logType: GIT_CHANGE_LOG_TYPE.user,
      section: '✨ Features | 新功能'
    },
    [GIT_COMMIT_TYPE.ui]: {
      logType: GIT_CHANGE_LOG_TYPE.user,
      section: '🎨 UI | UI 界面'
    },
    [GIT_COMMIT_TYPE.refactor]: {
      logType: GIT_CHANGE_LOG_TYPE.user,
      section: '♻️ Code Refactoring | 代码重构'
    },
    [GIT_COMMIT_TYPE.perf]: {
      logType: GIT_CHANGE_LOG_TYPE.user,
      section: '⚡ Performance Improvements | 性能优化'
    },

    [GIT_COMMIT_TYPE.fix]: {
      logType: GIT_CHANGE_LOG_TYPE.user,
      section: '🐛 Bug Fixes | Bug 修复'
    },

    [GIT_COMMIT_TYPE.undefined]: {
      section: ''
    }
  }
};

export default config;
