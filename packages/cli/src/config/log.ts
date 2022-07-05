const config = {
  name: 'lough',
  types: [
    {
      type: 'feat',
      section: '✨ Features | 新功能'
    },
    {
      type: 'fix',
      section: '🐛 Bug Fixes | Bug 修复'
    },
    {
      type: 'chore',
      section: '🚀 Chore | 构建/工程依赖/工具',
      hidden: true
    },
    {
      type: 'docs',
      section: '📝 Documentation | 文档'
    },
    {
      type: 'style',
      section: '💄 Styles | 样式'
    },
    {
      type: 'refactor',
      section: '♻️ Code Refactoring | 代码重构'
    },
    {
      type: 'perf',
      section: '⚡ Performance Improvements | 性能优化'
    },
    {
      type: 'test',
      section: '✅ Tests | 测试',
      hidden: true
    },
    {
      type: 'revert',
      section: '⏪ Revert | 回退',
      hidden: true
    },
    {
      type: 'build',
      section: '📦‍ Build System | 打包构建'
    },
    {
      type: 'ci',
      section: '👷 Continuous Integration | CI 配置'
    }
  ],
  issuePrefixes: ['#'],
  issueUrlFormat: '{{host}}/{{owner}}/{{repository}}/issues/{{id}}',
  commitUrlFormat: '{{host}}/{{owner}}/{{repository}}/commit/{{hash}}',
  compareUrlFormat: '{{host}}/{{owner}}/{{repository}}/compare/{{previousTag}}...{{currentTag}}',
  userUrlFormat: '{{host}}/{{user}}'
};
