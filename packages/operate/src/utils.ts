import execa from 'execa';

/**
 * 是否在 git 配置中
 * @description 借此判断 git 是否初始化
 */
export const existsGitConfigSync = (cwd = process.cwd()) => {
  let test = false;
  try {
    execa.commandSync('git rev-parse --is-inside-work-tree', { encoding: 'utf8', cwd });
    test = true;
  } catch (error) {}
  return test;
};
