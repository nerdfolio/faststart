import { type ParseArgsOptionsConfig, parseArgs } from "node:util"

export type CliParams = {
	args: string[]
	// biome-ignore lint/suspicious/noExplicitAny: whatev
	options: Record<string, any>
}

export function parseCommandLine(options?: ParseArgsOptionsConfig) {
	const { positionals, values } = parseArgs({
		options,
		strict: false,
		allowPositionals: true,
		tokens: true,
	})

	const params = { args: positionals, options: values }
	return params as CliParams
}
