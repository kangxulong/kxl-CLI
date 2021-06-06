const { promisify } = require("util");
const path = require("path");

// download是一个函数，如果下载完成需要传入回调函数来确认状态，会造成回调地域，可以用promisity来转化成Promise
const download = promisify(require("download-git-repo"));

const { vueRepo, reactRepo } = require("../config/repo-config");
const { commandSpawn } = require("../utils/terminal");
const { compile, writeToFile, createDirSync } = require("../utils/utils");

// 初始化项目
const createProjectAction = async (project) => {
	console.log("project is creating,please wait a minute");
	// 1. 从git仓库clone项目到project文件夹
	await download(vueRepo, project, { clone: true });

	// 2. 执行npm install
	const command = process.platform === "win32" ? "npm.cmd" : "npm";
	await commandSpawn(command, ["install"], { cwd: `./${project}` });

	// 3. 执行项目(npm run serve)

	commandSpawn(command, ["run", "serve"], { cwd: `./${project}` });
	// 4. 打开浏览器
	// 此处是webpack配置
};

// 创建component
const addComponentAction = async (name, dest) => {
	// 1. 解析ejs模板，创建result文件
	const result = await compile("vue-component.ejs", {
		name,
		lowerName: name.toLowerCase(),
	});
	// 2. 创建文件夹，写入文件
	console.log(`action中的：${dest}`);
	if (createDirSync(dest)) {
		const targetPath = path.resolve(dest, `${name}.vue`);
		writeToFile(targetPath, result);
	}
};

const addPageAndRouteAction = async (name, dest) => {
	// 1. 解析ejs模板
	const data = { name, lowerName: name.toLowerCase() };
	const pageResult = await compile("vue-component.ejs", data);
	const routeResult = await compile("vue-router.ejs", data);

	// 2. 写入文件
	const targetDest = path.resolve(dest, name.toLowerCase());
	if (createDirSync(targetDest)) {
		const targetPagePath = path.resolve(targetDest, `${name}.vue`);
		const targetRoutePath = path.resolve(targetDest, "router.js");

		writeToFile(targetPagePath, pageResult);
		writeToFile(targetRoutePath, routeResult);
	}
};

const addStoreAction = async (name, dest) => {
	// 1. 解析ejs模板
	const data = { name, lowerName: name.toLowerCase() };
	const storeResult = await compile("vue-store.ejs", data);
	const typesResult = await compile("vue-types.ejs", data);

	// 2. 写入文件
	const targetDest = path.resolve(dest, name.toLowerCase());
	if (createDirSync(targetDest)) {
		const targetStorePath = path.resolve(targetDest, "index.js");
		const targetTypesPath = path.resolve(targetDest, "types.js");

		writeToFile(targetStorePath, storeResult);
		writeToFile(targetTypesPath, typesResult);
	}
};

module.exports = {
	createProjectAction,
	addComponentAction,
	addPageAndRouteAction,
	addStoreAction,
};
