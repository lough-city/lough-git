import GitOperate from '@lough/git-operate';
import NpmOperate from '@lough/npm-operate';

const action = async () => {
  new GitOperate();
  const npm = new NpmOperate();

  if (npm.isLernaProject) {
    for (const packageName in npm.packages) {
      const config = npm.packages[packageName];

      const npmConfig = npm.readConfig();

      if (!npmConfig.scripts) npmConfig.scripts = {};
      npmConfig.scripts.changelog = ['lough-git changelog', `-t ${config.name}`, `-c ${config.dirName}`].join(' ');

      npm.writeConfig(npmConfig);
    }

    return;
  }

  /* 添加 changelog scripts START */

  const npmConfig = npm.readConfig();

  if (!npmConfig.scripts) npmConfig.scripts = {};
  npmConfig.scripts.changelog = 'lough-git changelog';

  npm.writeConfig(npmConfig);

  /* 添加 changelog scripts END */
};

export default {
  command: 'init',
  description: '初始化 git 日志',
  action
};
