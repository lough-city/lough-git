import path from 'path';
import GitChangeLog from '@lough/git-changelog';
import { program } from 'commander';

const action = async (_d: any, data: { lerna: boolean }) => {
  const projectPath = path.join('E:', 'City', 'lyrical', 'lyrical');
  // TODO: 提取变量

  if (data.lerna) {
    const gitChangeLog = new GitChangeLog({
      rootPath: projectPath,
      repo: 'https://github.com/AnCIity/lyrical',
      tagFilter: { match: '*react*' },
      logFilter: { changedDirOrFile: 'packages/react' }
    });

    gitChangeLog.createUserLog();
    gitChangeLog.createDevelopLog();
  } else {
    const gitChangeLog = new GitChangeLog({
      rootPath: projectPath,
      repo: 'https://github.com/AnCIity/lyrical'
    });

    gitChangeLog.createUserLog();
    gitChangeLog.createDevelopLog();
  }
};

export default {
  command: 'log [lerna]',
  description: 'create git commit log.',
  action
};
