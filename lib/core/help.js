const program = require("commander");

const helpOption = () => {
	program.option("-f, --framework <framework>", "your framework name");
	program.option(
		"-d, --dest <dest>",
		"a destination folder,例如：-d src/page, 使用/src/page会发生错误"
	);

	program.on("--help", () => {
		console.log("usage");
	});
};

module.exports = helpOption;
