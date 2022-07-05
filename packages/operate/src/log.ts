import execa from 'execa';
import { IGitLog, IGitLogFilter, IGitLogOrigin, IGitParameters, IGitTagFilter } from './types';
import { GIT_LOG_FORMAT_FIELD } from './constants';

class GitLog {
  protected options = {} as Required<IGitParameters>;

  constructor(options: Required<IGitParameters>) {
    this.options = options;
  }

  commit({ filter }: { filter?: IGitLogFilter } = {}): Array<IGitLog> {
    const commands = ['git', 'log', '--date=iso', `--format=${JSON.stringify(GIT_LOG_FORMAT_FIELD)},`];

    if (filter?.fromTag) commands.push(`${filter.fromTag}...${filter.toTag || 'HEAD'}`);
    if (filter?.changedDirOrFile) commands.push(`-- ${filter.changedDirOrFile}`);

    const { stdout } = execa.commandSync(commands.join(' '), { cwd: this.options.rootPath });

    const logList: Array<IGitLogOrigin> = JSON.parse(
      `[${stdout.substring(0, stdout.length - 1).replace(/"[^"]*":"[^"]*(\n)[^"]*"/g, $0 => $0.replace(/\n/g, '\\n'))}]`
    );

    return logList.map(log => {
      if (!log.originSubject) return log;

      const result = /^([a-z]*)(?:\(([^)]*)\))?: (.*)$/.exec(log.originSubject);
      if (!result) return log;

      const [_originSubject, type = '', scope = '', subject = ''] = result;

      return { ...log, type, scope, subject };
    });
  }

  tag({ filter }: { filter?: IGitTagFilter } = {}) {
    const commands = ['git', 'tag'];
    if (filter?.match) commands.push(`-l ${filter.match}`);

    const { stdout } = execa.commandSync(commands.join(' '), { cwd: this.options.rootPath });

    const tagList = stdout.split('\n');

    return tagList;
  }
}

export default GitLog;
