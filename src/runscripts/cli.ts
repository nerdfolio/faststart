#!/usr/bin/env -S pnpm tsx

import path from "node:path"
import { setTimeout } from "node:timers/promises"
import { type CliParams, parseCommandLine } from "../packages/runscript/src/common"

async function main() {
	const { args, options } = parseCommandLine({
		path: { type: "string", default: "./scripts" },
	})

	const [scriptName, ...scriptArgs] = args
	const { path: scriptPath, ...scriptOpts } = options

	if (!scriptName) {
		console.log("No script name provided. Usage:\n")
		console.log("  $0 [--path <path prefix to script>] <scriptname> [script-specific args and options]\n\n")
		process.exit(1)
	}

	await runScript(path.join(scriptPath as string, scriptName), { args: scriptArgs, options: scriptOpts })
}

async function runScript(scriptFile: string, params: CliParams) {
	console.log(`Running ${scriptFile} with params ${JSON.stringify(params)}`)

	const { default: script } = await import(path.join(process.cwd(), scriptFile))

	// do a setTimeout to allow node deprecation warnings that we don't control (e.g. punycode)
	// to get printed upon importing a module. Without this, scripts that prompt the user for input
	// may have its prompt messages interlaced with the Nodejs warnings
	await setTimeout(1)

	await script(params)
}

main()
