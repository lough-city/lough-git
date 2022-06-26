import execa from 'execa';

const action = async () => {
  const values = execa.commandSync('git log');
  console.log(values);
};

export default {
  command: 'log',
  description: 'create git commit log.',
  action
};
