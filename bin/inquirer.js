const abk_temp_config = [
	{
		name: "Pc(vue3 + Element-Plus + abk内部使用)",
		url: "http://gitlab.dev.anbangke.com/frontend/abk-temp-cli.git",
		checkout: "pc-admin-template",
	},
	{
		name: "H5(vue3 + vant + abk内部使用)",
		url: "http://gitlab.dev.anbangke.com/frontend/abk-temp-cli.git",
		checkout: "h5-template",
	},
];

const vue_temp_config = [
	{
		name: "Pc(vue3 + Element-Plus + 个人搭建的公共模板)",
		url: "https://gitee.com/wang-xiaoze/project-template.git",
		checkout: "vue-admin-template",
	},
	{
		name: "H5(vue3 + vant + 公共模板)",
		url: "https://gitee.com/wang-xiaoze/project-template.git",
		checkout: "vue-h5-template",
	},
];

const node_temp_config = [
	{
		name: "Node(Nest + MySql + 公共模板)",
		url: "https://gitee.com/wang-xiaoze/project-template.git",
		checkout: "node-nest-template",
	},
	{
		name: "Node(Express + Mongoose + 公共模板)",
		url: "https://gitee.com/wang-xiaoze/project-template.git",
		checkout: "node-express-template",
	},
];

const app_temp_config = [
	{
		name: "uni-app(vue3 + 公共模板)",
		url: "https://gitee.com/wang-xiaoze/project-template.git",
		checkout: "uniapp-template",
	},
	{
		name: "Flutter(dart3 + Getx + Dio + 公共模板(暂未开发))",
		url: "https://gitee.com/wang-xiaoze/project-template.git",
		checkout: "flutter-template",
	},
];

const app_template = [
	{
		key: "abk内部使用",
		value: abk_temp_config,
	},
	{
		key: "vue",
		value: vue_temp_config,
	},
	{
		key: "node",
		value: node_temp_config,
	},
	{
		key: "app",
		value: app_temp_config,
	},
];

exports.app_template = app_template;

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
		message: "Please select the required project type:",
		choices: app_template.map(item => item.key),
		default: 0,
	},
];
exports.inquirerConfig = inquirerConfig;
