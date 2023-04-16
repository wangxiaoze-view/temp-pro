const gitConfig = [
    {
        name: "Pc(vue3 + Element-Plus + abk公司内部使用)",
        url: "http://gitlab.dev.anbangke.com/frontend/abk-temp-cli.git",
        checkout: 'pc-admin-template'
    },
    {
        name: "H5(vue3 + vant + abk公司内部使用)",
        url: "http://gitlab.dev.anbangke.com/frontend/abk-temp-cli.git",
        checkout: 'h5-template'
    },
    {
        name: "Node(Nest + MySql + 个人使用)",
        url: "https://gitee.com/wang-xiaoze/nest-api-admin.git",
        checkout: 'master'
    },
    {
        name: "Node(Express + MongoDB + 公共模板)",
        url: "https://gitee.com/wang-xiaoze/node-service-template.git",
        checkout: 'master'
    },
];
exports.gitConfig = gitConfig;

const inquirerConfig = [
    {
        type: "input",
        name: "description",
        message: "Please enter a project description?",
        default: "An interesting project template",
    },
    {
        type: "input",
        name: "author",
        message: "Please enter the author's name?",
        default: "王小泽(wangxiaoze@petalmail.com)",
    },
    {
        type: "list",
        name: "keywords",
        message: "Please select the required project template?",
        choices: gitConfig.map(item => item.name),
        default: 0,
    },
];
exports.inquirerConfig = inquirerConfig;
