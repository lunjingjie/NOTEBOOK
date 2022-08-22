#! /usr/bin/env node

// #! 符号的名称叫 Shebang，用于指定脚本的解释程序
// Node CLI 应用入口文件必须要有这样的文件头
// 如果是Linux 或者 macOS 系统下还需要修改此文件的读写权限为 755
// 具体就是通过 chmod 755 cli.js 实现修改

// 用于检查入口文件是否正常执行

console.log('my-cli working');

const inquirer = require('inquirer');
const path = require('path');
const fs = require('fs');
const ejs = require('ejs');

inquirer.prompt([
  {
    type: 'input',
    name: 'name',
    message: 'Your Name', // 提示信息
    default: 'my-cli', // 默认值
  }
]).then(answers => {
  console.log(answers);
  // 模块文件目录
  const destUrl = path.join(__dirname, 'templates');
  // 生成文件目录
  const cwdUrl = process.cwd(); // 对应控制台所在目录
  // 从模板目录中读取文件
  fs.readdir(destUrl, (err, files) => {
    if (err) throw err;
    files.forEach((file) => {
      ejs.renderFile(path.join(destUrl, file), answers).then((data) => {
        fs.writeFileSync(path.join(cwdUrl, file), data);
      });
    });
  });
});