const chalk = require("chalk");
const fs = require("fs");
const path = require('path')

const symbols = require("log-symbols");
const inquirer = require("inquirer");
const ora = require("ora");
const figlet = require("figlet");
const handlebars = require("handlebars");
const child_process = require('child_process')
const { inquirerConfig, gitConfig } = require("./inquirer");

const spinner = ora("正在下载项目模板, 请稍等...");

const LOGO = "TEMP_PRO";


const removeDirectory = (url) => {
    const files = fs.readdirSync(url);
  
    files.forEach(function (file, index) {
      const curPath = path.join(url, file);
  
      if (fs.statSync(curPath).isDirectory()) removeDirectory(curPath);
      else fs.unlinkSync(curPath);
    });
    fs.rmdirSync(url);
  }


/**
 * @description 给help美化颜色
 */
const handlerHelp = () => {
    console.log();
    console.log(
        `运行 ${chalk.cyan("wz-cli <command> --help")} 了解给定命令的详细用法。`
    );
    console.log();
};
exports.handlerHelp = handlerHelp;


/**
 * @description 检测文件名是否存在
 * @param {String} name
 * @param {Function} callback
 * @returns
 */
const isExistFileName = name => {
    if (!name) {
         console.log(
            symbols.error,
            chalk.red.bold(`\nError: 请输入项目名称!\n`)
        );
        process.exit(1);
    };
    if (!fs.existsSync(name)) {
        handlerInquirer(name);
    } else {
        console.log(
            symbols.error,
            chalk.red.bold(`\nError: 项目【${name}】已存在，请更改项目名称!\n`)
        );
        process.exit(1);
    }
};

/**
 * @description 提供用户界面和查询会话流程
 * @param {String} name
 * @param {String} url
 */
const handlerInquirer = name => {
    inquirer.prompt(inquirerConfig).then(answers => {
        spinner.start();

        const { keywords = "" } = answers;

        const findGit = gitConfig.find(git => git.name === keywords) || {};

        if (findGit.url !== "" && findGit.checkout !== "") {
            // 根据git地址下载文件
            downloadProject(findGit.url, findGit.checkout, name, answers);
        } else {
            spinner.fail();
            console.log(symbols.error, chalk.red.bold(`\nError: 模板地址不存在!\n`));
            process.exit(1);
        }
    });
};

/**
 * @description 根据git地址下载文件
 * @param {String} url  git 地址
 * @param checkout
 * @param {String} name 项目名字
 * @param {*} answers 会话流程回调参数
 */
const downloadProject = (url, checkout, name, answers) => {

    child_process.exec(`git clone -b ${checkout} ${url} ${name}`, (error, stdout) => {
        if (error) {
            spinner.fail();
            console.log(symbols.error, chalk.red(error.message));
            removeDirectory(name);
            process.exit(1);
        }

        if (stdout.length) {
        } else {
            removeDirectory(`${name}/.git`);
            spinner.succeed();
            const fileName = `${name}/package.json`;
            const meta = {
                name,
                description: answers.description,
                author: answers.author,
            };
            if (fs.existsSync(fileName)) {
                const content = fs.readFileSync(fileName).toString();
                const result = handlebars.compile(content)(meta);
                fs.writeFileSync(fileName, result);
            }
            console.log(symbols.success, chalk.green("项目模板初始化完成..."));
            handlerLogo(name);
        }
    })
};

/**
 * @description 打印logo
 * @param {String} name 项目名
 * @returns
 */
const handlerLogo = name => {
    if (!name) return;
    console.log(
        "\r\n" +
        figlet.textSync(LOGO, {
            horizontalLayout: "default",
            verticalLayout: "default",
            width: 80,
            whitespaceBreak: true,
        }) +
        "\r\n"
    );

    console.log(chalk.green(`\t打开项目：cd ${name}`));
    console.log(
        chalk.green(
            `\t安装依赖：npm install or cnpm install or yarn install or pnpm install`
        )
    );
};

exports.isExistFileName = isExistFileName;