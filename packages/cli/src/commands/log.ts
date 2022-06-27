import execa from 'execa';
import { GIT_LOG_FORMAT_FIELD } from '../constants/log';

const action = async () => {
  const { stdout } = execa.commandSync(`git log --date=iso --format=${JSON.stringify(GIT_LOG_FORMAT_FIELD)},`);

  const log: Record<keyof typeof GIT_LOG_FORMAT_FIELD, string> = JSON.parse(
    `[${stdout
      .substring(0, stdout.length - 1)
      .replace(/"[^"]*":"[^"]*(\n)[^"]*"/g, ($0, $1) => $0.replace(/\n"/g, '\\n"'))}]`
  );
  console.log(log);
};

export default {
  command: 'log',
  description: 'create git commit log.',
  action
};
