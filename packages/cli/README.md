# @lough/git-cli

> This is a Git tool docked in lough.

## Feature

> `JavaScript` 开发中的提交日志生成及其功能自动化集成脚手架。

1. `lough-git init`：自动化集成项目日志生成能力。

2. `lough-git changelog`: 支持生成以下代码日志：

   - 用户日志：主要给展现对象为用户，包含用户关心的提交类型如：`feat` `fix` ...

   - 开发日志：主要给展现对象为开发，包含开发关心的提交类型如：`chore` `ci` ...



## Install

```bash
npm i @lough/git-cli -g
```

or

```bash
yarn add @lough/git-cli -g
```



## Usage

我们来看看其有哪些命令：

```bash
> lough-git --help

Usage: index [options] [command]

Options:
  -V, --version        output the version number
  -h, --help           display help for command

Commands:
  init                 init project git log function
  changelog [options]  create git commit change log.
  help [command]       display help for command
```

执行 `lough-git init` 即可运行我们的初始化程序。

接下来看看 `lough-git chnagelog` 命令有哪些选项：

```bash
> lough-git changelog --help

Usage: index changelog [options]

create git commit change log.

Options:
  -o, --outputLogType [string...]  Output Log Type: Array<user | develop> (default: ["user","develop"])
  -p, --projectPath [string]       Project Root Path (default: "E:\\City\\lough\\lough-git")
  -r, --repo [string]              Repository
  -t, --tagMatch [string]          Tag Match
  -c, --changedDir [string]        Commit Changed Dir
  -h, --help                       display help for command
```



## Plan

欢迎大家共建。
