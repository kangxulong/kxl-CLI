const ejs = require("ejs");
const fs = require("fs");
const path = require("path");

const compile = (template, data) => {
	const templatePosition = `../templates/${template}`;
	const templatePath = path.resolve(__dirname, templatePosition);

	return new Promise((resolve, reject) => {
		ejs.renderFile(templatePath, { data }, {}, (err, result) => {
			if (err) {
				console.log(err);
				reject(err);
				return;
			}
			resolve(result);
		});
	});
};

const createDirSync = (pathName) => {
	if (fs.existsSync(pathName)) {
		return true;
	} else {
		if (createDirSync(path.dirname(pathName))) {
			// 递归调用检查父路径是否存在，如果存在，则创建子路径
			fs.mkdirSync(pathName);
			return true;
		}
	}
};

const writeToFile = (path, content) => {
	return fs.promises.writeFile(path, content)
};

module.exports = {
	compile,
	writeToFile,
	createDirSync
};
