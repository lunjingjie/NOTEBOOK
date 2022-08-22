const {
  getRepoList,
  getTagList
} = require('./http')
const inquirer = require('inquirer')
const ora = require('ora')
const util = require('util')
const path = require('path')
const downloadGitRepo = require('download-git-repo') // 不支持promise，需要先promise化
const chalk = require('chalk')

// 添加加载动画
async function wrapLoading(fn, message, ...args) {
  const spinner = ora(message);
  spinner.start();

  try {
    const result = await fn(...args);
    spinner.succeed();
    return result;
  } catch (error) {
    spinner.fail('request failed, refetch...');
  }
}

class Generator {
  constructor(name, targetDir) {
    this.name = name;
    this.targetDir = targetDir;
    this.downloadGitRepo = util.promisify(downloadGitRepo);
  }

  async getRepo() {
    // 1.从远程拉取模板数据
    const repoList = await wrapLoading(getRepoList, 'waiting fetch template...');
    if (!repoList) {
      return;
    }

    const repos = repoList.map(item => item.name);

    // 2.用户选择模板
    const {
      repo
    } = await inquirer.prompt({
      name: 'repo',
      type: 'list',
      choices: repos,
      message: 'Please choose a template to create project',
    });

    return repo;
  }

  async getTag(repo) {
    const tags = await wrapLoading(getTagList, 'waiting fetch tag', repo);
    if (!tags) {
      return;
    }

    const tagsList = tags.map(item => item.name);

    const {
      tag
    } = await inquirer.prompt({
      name: 'tag',
      type: 'list',
      choices: tagsList,
      message: 'Place choose a tag to create project',
    });

    return tag;
  }

  async download(repo, tag) {
    // 拼接下载地址
    const requestUrl = `zhurong-cli/${repo}${tag?'#'+tag:''}`;
    await wrapLoading(this.downloadGitRepo, 'waiting download template', requestUrl, path.resolve(process.cwd(), this.targetDir));
  }

  async create() {
    const repo = await this.getRepo();
    const tag = await this.getTag(repo);
    await this.download(repo, tag);
    console.log(`\r\nSuccessfully created project ${chalk.cyan(this.name)}`)
    console.log(`\r\n  cd ${chalk.cyan(this.name)}`)
    console.log('  npm run dev\r\n')
  }
}

module.exports = Generator;