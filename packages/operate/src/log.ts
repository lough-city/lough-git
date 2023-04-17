import execa from 'execa';
import { GIT_COMMIT_TYPE, GIT_LOG_FORMAT_FIELD } from './constants';
import { IGitLog, IGitLogFilter, IGitLogOrigin, IGitOperateParameters, IGitTagFilter } from './types';

class GitLog {
  private options = {} as Required<IGitOperateParameters>;

  constructor(parameters: Required<IGitOperateParameters>) {
    this.options = parameters;
  }

  commit({ filter }: { filter?: IGitLogFilter } = {}): Array<IGitLog> {
    const commands = ['git', 'log', '--date=iso', `--format=${JSON.stringify(GIT_LOG_FORMAT_FIELD)},`];

    if (filter?.fromTag && filter?.toTag) commands.push(`${filter.fromTag}...${filter.toTag}`);
    if (filter?.fromTag && !filter?.toTag) commands.push(`${filter.fromTag}...HEAD`);
    if (!filter?.fromTag && filter?.toTag) commands.push(`${filter.toTag}`);

    if (filter?.changedDirOrFile) commands.push(`-- ${filter.changedDirOrFile}`);

    const { stdout } = execa.commandSync(commands.join(' '), { cwd: this.options.rootPath });

    const logList: Array<IGitLogOrigin> = JSON.parse(
      `[${stdout.substring(0, stdout.length - 1).replace(/"[^"]*":"[^"]*(\n)[^"]*"/g, $0 => $0.replace(/\n/g, '\\n'))}]`
    );

    return logList.map(log => {
      if (!log.originSubject) return { ...log, type: GIT_COMMIT_TYPE.undefined };

      const result = /^([a-z]*)(?:\(([^)]*)\))?: (.*)$/.exec(log.originSubject);
      if (!result) return { ...log, type: GIT_COMMIT_TYPE.undefined };

      const [_originSubject, type = GIT_COMMIT_TYPE.undefined, scope = '', subject = ''] = result;

      return { ...log, type: type as GIT_COMMIT_TYPE, scope, subject };
    });
  }

  tag({ filter }: { filter?: IGitTagFilter } = {}) {
    const commands = ['git', 'tag'];
    if (filter?.match) commands.push(`-l ${filter.match}`);

    const { stdout } = execa.commandSync(commands.join(' '), { cwd: this.options.rootPath });

    if (!stdout) return [];

    const tagList = stdout.split('\n');

    return tagList;
  }

  tagTime(tag: string) {
    const commands = ['git', 'show', tag, '-s', `--format=%ai`];
    const { stdout } = execa.commandSync(commands.join(' '), { cwd: this.options.rootPath });
    const infoList = stdout.split('\n');
    const date = new Date(infoList.pop() as string);

    return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
  }
}

export default GitLog;
