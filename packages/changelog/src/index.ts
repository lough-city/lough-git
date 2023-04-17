import GitOperate, { IGitLog, GIT_COMMIT_TYPE } from '@lough/git-operate';
import { Package } from '@lough/npm-operate';
import { RequiredOmit } from '@lyrical/types';
import config from './config';
import { GIT_CHANGE_LOG_TYPE } from './constants';
import GitLogRender from './markdown';
import { IGitChangeLogParameters } from './types';

class GitChangeLog {
  private options = {} as RequiredOmit<IGitChangeLogParameters, 'tagFilter' | 'logFilter'>;

  private npm: Package;
  private git: GitOperate;

  constructor(parameters: IGitChangeLogParameters) {
    const { repo = undefined, rootPath = process.cwd(), nextVersion = 'HEAD', tagFilter, logFilter } = parameters;

    this.npm = new Package({ dirName: rootPath });
    this.git = new GitOperate({ rootPath });

    this.options.repo = repo || this.git.config.repo || '';
    this.options.repo = this.options.repo.includes('.git') ? this.options.repo.replace('.git', '') : this.options.repo;
    this.options.rootPath = rootPath;
    this.options.nextVersion = nextVersion;
    this.options.tagFilter = tagFilter;
    this.options.logFilter = logFilter;
  }

  private getVersionCommitList({ fromTag, toTag }: { fromTag?: string; toTag?: string } = {}) {
    return this.git.log.commit({ filter: { ...this.options.logFilter, fromTag, toTag } });
  }

  private classifyCommitMap(
    commitList: Array<IGitLog>,
    commitTypeList = Object.keys(config.types) as Array<GIT_COMMIT_TYPE>
  ) {
    return commitList
      .filter(commit => commit.type && commitTypeList.includes(commit.type))
      .reduce((map, commit) => {
        if (map[commit.type]) map[commit.type].push(commit);
        else map[commit.type] = [commit];
        return map;
      }, {} as Record<GIT_COMMIT_TYPE, Array<IGitLog>>);
  }

  /**
   * 创建日志 markdown
   * @param logType "user" | "develop"
   * @returns markdown
   */
  createLogMarkdown(logType: GIT_CHANGE_LOG_TYPE) {
    const render = new GitLogRender();

    render.createHeader(this.npm.name);
    const commitTypeList = Object.keys(config.types).filter(
      key => config.types[key as keyof typeof GIT_COMMIT_TYPE].logType === logType
    ) as Array<GIT_COMMIT_TYPE>;
    // const commitTypeFile = `${GIT_CHANGE_LOG_CREATE_FILE_NAME[logType]}.md`;

    const tagList = this.git.log.tag({ filter: this.options.tagFilter });
    const versionTagList = [
      ...tagList.map((tag, index) => ({ fromTag: tagList[index - 1], toTag: tag, isNext: false })),
      { fromTag: tagList[tagList.length - 1], toTag: this.options.nextVersion, isNext: true }
    ].sort(() => -1);

    for (const versionTag of versionTagList) {
      const commitList = this.getVersionCommitList(versionTag);
      const classifyMap = this.classifyCommitMap(commitList, commitTypeList);
      if (versionTag?.isNext && !Object.values(classifyMap).some(v => v.length)) continue;

      const date = new Date();
      const time = versionTag.toTag
        ? this.git.log.tagTime(versionTag.toTag)
        : `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;

      const compareUrl = `${this.options.repo}/compare/${versionTag.fromTag}...${versionTag.toTag}`;
      render.createVersionMarkdown(versionTag.toTag, compareUrl, time);

      for (const type of commitTypeList) {
        const commits = classifyMap[type];
        if (!commits) continue;

        render.createClassifyMarkdown(type);
        render.createCommitMarkdown(commits, this.options.repo);
      }
    }

    render.createFooterMarkdown();

    return render.markdown;
  }

  /**
   * 创建用户日志
   * @returns markdown
   */
  createUserLog() {
    return this.createLogMarkdown(GIT_CHANGE_LOG_TYPE.user);
  }

  /**
   * 创建开发日志
   * @returns markdown
   */
  createDevelopLog() {
    return this.createLogMarkdown(GIT_CHANGE_LOG_TYPE.develop);
  }
}

export * from './constants';
export * from './types';
export default GitChangeLog;
