#!/usr/bin/env node
const program = require("commander");

const helpOption = require("./lib/core/help")
const {createCommander} = require("./lib/core/create")

// 获取版本号
program.version(require("./package.json").version);

process.on('unhandledRejection', (reason, p) => {
  console.log('Unhandled Rejection at: Promise', p, 'reason:', reason);
  // application specific logging, throwing an error, or other logic here
});
// 其他终端命令
helpOption()

// 个人创建的命令
createCommander()

// 解析终端指令
program.parse(process.argv)