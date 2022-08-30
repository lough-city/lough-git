import chalk from 'chalk';
import { prompt } from 'inquirer';
import GitOperate from '@lough/git-operate';
import NpmOperate from '@lough/npm-operate';
import { startLoadingSpinner, succeedLoadingSpinner, succeedSpinner } from '../utils/spinner';

const PACKAGE = '@lough/git-cli';

const getSub = (keyList: Array<string>) =>
  prompt<{ targets: Array<string> }>([
    {
      type: 'checkbox',
      name: 'targets',
      message: `Please select need initialized sub package:`,
      choices: keyList.map(type => ({ name: type, checked: true }))
    }
  ]).then(res => res.targets);

const action = async () => {
  const _git = new GitOperate();
  const npm = new NpmOperate();

  if (npm.isLernaProject) {
    const list = await getSub(Object.keys(npm.packages));

    for (const packageName of list) {
      const config = npm.packages[packageName];

      startLoadingSpinner(`${config.name}：开始安装 ${PACKAGE}`);
      npm.uninstallLerna(PACKAGE, config.name);
      npm.installDevLerna(PACKAGE, config.name);
      succeedLoadingSpinner(`${config.name}：安装 ${PACKAGE} 成功`);

      /* 配置写入 */
      startLoadingSpinner(`${config.name}：开始写入命令 lough-git`);
      const npmConfig = npm.readConfigLerna(config.name);

      if (!npmConfig.scripts) npmConfig.scripts = {};
      npmConfig.scripts.changelog = ['lough-git changelog', `-t ${config.name}*`, `-c .`].join(' ');

      npm.writeConfigLerna(npmConfig, config.name);
      succeedLoadingSpinner(`${config.name}：写入命令 lough-git 成功`);
    }
  } else {
    startLoadingSpinner(`开始安装 ${PACKAGE}`);
    npm.uninstall(PACKAGE);
    npm.installDev(PACKAGE);
    succeedLoadingSpinner(`安装 ${PACKAGE} 成功`);

    startLoadingSpinner(`开始写入 package.json`);
    const npmConfig = npm.readConfig();

    if (!npmConfig.scripts) npmConfig.scripts = {};
    npmConfig.scripts.changelog = 'lough-git changelog';

    npm.writeConfig(npmConfig);
    succeedLoadingSpinner('写入 package.json 成功');
  }

  succeedSpinner(chalk.green('Lough Git 初始化成功!'));
};

export default {
  command: 'init',
  description: 'init project git log function.',
  action
};
