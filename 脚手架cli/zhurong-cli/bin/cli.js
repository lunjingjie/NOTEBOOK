#! /usr/bin/env node

const program = require('commander')
const chalk = require('chalk')
const figlet = require('figlet')

// 定义命令和参数
program
  .command('create <app-name>')
  .description('create a new project')
  .option('-f, --force', 'overwrite taget directory if it exist')
  .action((name, options) => {
    // 在create.js中执行创建任务
    require('../lib/create.js')(name, options);
  })

program.version(`v${require('../package.json').version}`).usage('<command> [option]')

program.on('--help', () => {
  console.log('\r\n' + figlet.textSync('zhurong', {
    font: 'Ghost',
    horizontalLayout: 'default',
    verticalLayout: 'default',
    width: 80,
    whitespaceBreak: true
  }))
  console.log(`\r\nRun ${chalk.cyan(`roc <command> --help`)} show details\r\n`)
})

// 解析用户执行命令传入参数
program.parse(process.argv);