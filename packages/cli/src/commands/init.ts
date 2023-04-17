import GitOperate from '@lough/git-operate';
import { Package } from '@lough/npm-operate';
import chalk from 'chalk';
import { prompt } from 'inquirer';
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
  const npm = new Package();

  if (npm.options.isWorkspaces) {
    const subList = await getSub([npm.name, ...npm.children.map(item => item.name)]);
    const list = [
      ...(subList.includes(npm.name) ? [npm] : []),
      ...npm.children.filter(item => subList.includes(item.name))
    ];

    for (const item of list) {
      startLoadingSpinner(`${item.name}：开始安装 ${PACKAGE}`);
      item.uninstall(PACKAGE);
      item.installDev(PACKAGE);
      succeedLoadingSpinner(`${item.name}：安装 ${PACKAGE} 成功`);

      /* 配置写入 */
      startLoadingSpinner(`${item.name}：开始写入命令 lough-git`);
      const npmConfig = item.readConfig();

      if (!npmConfig.scripts) npmConfig.scripts = {};
      npmConfig.scripts.changelog = [
        'lough-git changelog',
        ...(item.options.isWorkspaces ? [] : [`-t ${item.name}*`]),
        `-c .`
      ].join(' ');

      item.writeConfig(npmConfig);
      succeedLoadingSpinner(`${item.name}：写入命令 lough-git 成功`);
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
