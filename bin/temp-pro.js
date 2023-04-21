#!/usr/bin/env node

const program = require("commander");
const { handlerHelp, isExistFileName } = require("./handler");

program
	.version(require("../package.json").version, "-v, --version")
	.on("--help", handlerHelp)
	.command("create <name>")
	.action(async name => {
		await isExistFileName(name);
	});
program.parse(process.argv);
