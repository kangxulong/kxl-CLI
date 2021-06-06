/**
 * 执行终端命令相关的代码
 */
const { spawn } = require('child_process');

const commandSpawn = (...args) => {
  return new Promise((resolve,reject)=>{

    // spawn方法会生成一个新的子进程来执行arg传入的命令
    const childProcess = spawn(...args);
    // 在shell中输出
    childProcess.stdout.pipe(process.stdout);
    childProcess.stderr.pipe(process.stderr);

    // 输出结束后关闭子进程
    childProcess.on('close',() => {
      resolve()
    })
  })
}

module.exports = {
  commandSpawn
}