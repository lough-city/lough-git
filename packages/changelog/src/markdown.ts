import { IGitLog } from '@lough/git-operate';

class GitLogRender {
  private document: Array<string> = [];

  get markdown() {
    return this.document.join('\n');
  }

  createHeader(name: string) {
    this.document.push(
      `# ${name}`,
      '',
      'All notable changes to this project will be documented in this file. Dates are displayed in UTC.',
      'Generated by [`@lough/git-cli`](https://github.com/anciity/lough-git).'
    );
  }

  createVersionMarkdown(version: string) {
    this.document.push('', `## ${version}`);
  }

  createClassifyMarkdown(type: string) {
    this.document.push('', `### ${type}`);
  }

  createCommitMarkdown(commitList: Array<IGitLog>) {
    this.document.push(
      '',
      ...commitList.map(commit => `- ${commit.scope ? `【${commit.scope}】: ` : ''}${commit.subject}`)
    );
  }

  createFooterMarkdown() {
    this.document.push('', 'end.');
  }
}

export default GitLogRender;
