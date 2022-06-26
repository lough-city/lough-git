import execa from 'execa';
import { GIT_LOG_FORMAT_FIELD } from '../constants/log';

const action = async () => {
  const { stdout } = execa.commandSync(`git log --format="${JSON.stringify(GIT_LOG_FORMAT_FIELD)}"`);

  // const log = JSON.parse(stdout)
  // Record<keyof typeof GIT_LOG_FORMAT_FIELD, string>
  console.log(stdout);
};

export default {
  command: 'log',
  description: 'create git commit log.',
  action
};
