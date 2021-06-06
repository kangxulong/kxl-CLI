const program = require("commander");

const { 
  createProjectAction, 
  addComponentAction,
  addPageAndRouteAction,
	addStoreAction
} = require("./action");

const options = program.opts();

const createCommander = () => {
	program
		.command("create <project> [others...]")
		.description("clone a repository into a folder")
		.action(createProjectAction);

	program
		.command("addcpn <name>")
		.description(
			"add a Vue component as name, for example: kxl addcpn Home [-d src/component]"
		)
		.action((name) => {
			// -d <dest> dest会保存在program.opts()对象中
			addComponentAction(name, options.dest || "src/components");
		});
	program
		.command("addpage <page>")
		.description(
			"add a Vue page and route as page, for example: kxl addpage Home [-d src/pages]"
		)
		.action((page) => {
			// -d <dest> dest会保存在program中
			addPageAndRouteAction(page, options.dest || "src/pages");
		});

	program
	.command("addstore <store>")
	.description(
		"add a Vuex store,for example: kxl addstore kxl"
	)
	.action((store) => {
		// -d <dest> dest会保存在program中
		addStoreAction(store, options.dest || "src/store/modules");
	});
};

module.exports = {
	createCommander,
};
