import fs from 'fs';
import path from 'path';
import NpmOperate from '@lough/npm-operate';
import GitOperate, {
  developLogCommitTypeList,
  GitAllCommitType,
  IGitLog,
  userLogCommitTypeList
} from '@lough/git-operate';
import GitLogRender from './markdown';
import { IGitChangeLogParameters } from './types';
import { GIT_CHANGE_LOG_CREATE_FILE_NAME, GIT_CHANGE_LOG_TYPE } from './constants';

class GitChangeLog {
  private options = {} as Required<IGitChangeLogParameters>;

  private npm!: NpmOperate;
  private git!: GitOperate;

  constructor(parameters: IGitChangeLogParameters) {
    const { repo = '', rootPath = process.cwd(), nextVersion = 'Unreleased' } = parameters;

    this.npm = new NpmOperate({ rootPath });
    this.git = new GitOperate({ rootPath });

    this.options.repo = repo;
    this.options.rootPath = rootPath;
    this.options.nextVersion = nextVersion;
  }

  private getVersionCommitList({ fromTag, toTag }: { fromTag?: string; toTag?: string } = {}) {
    return this.git.log.commit({ filter: { fromTag, toTag } });
  }

  private classifyCommitMap(commitList: Array<IGitLog>) {
    return commitList.reduce((map, commit) => {
      if (map[commit.type || '']) map[commit.type || ''].push(commit);
      else map[commit.type || ''] = [commit];
      return map;
    }, {} as Record<GitAllCommitType, Array<IGitLog>>);
  }

  private createMarkdown(logType: GIT_CHANGE_LOG_TYPE) {
    const render = new GitLogRender();

    render.createHeader(this.npm.readConfig().name);
    const commitTypeList: Array<GitAllCommitType> =
      logType === GIT_CHANGE_LOG_TYPE.user ? userLogCommitTypeList : developLogCommitTypeList;
    const commitTypeFile = `${GIT_CHANGE_LOG_CREATE_FILE_NAME[logType]}.md`;

    const tagList = this.git.log.tag().sort(() => -1);
    const versionTagList = tagList.map((tag, index) => ({ fromTag: tagList[index - 1], toTag: tag }));

    for (const versionTag of versionTagList) {
      render.createVersionMarkdown(versionTag.toTag || this.options.nextVersion);

      const commitList = this.getVersionCommitList(versionTag);
      const classifyMap = this.classifyCommitMap(commitList);

      for (const type in classifyMap) {
        if (!commitTypeList.includes(type as GitAllCommitType)) continue;

        render.createClassifyMarkdown(type);
        render.createCommitMarkdown(classifyMap[type]);
      }
    }

    render.createFooterMarkdown();

    fs.writeFileSync(path.join(process.cwd(), commitTypeFile), render.markdown, 'utf8');
  }

  createUserLog() {
    this.createMarkdown(GIT_CHANGE_LOG_TYPE.user);
  }

  createDevelopLog() {
    this.createMarkdown(GIT_CHANGE_LOG_TYPE.develop);
  }
}

export * from './constants';
export * from './types';
export default GitChangeLog;
