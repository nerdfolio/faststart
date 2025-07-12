import { type BetterAuthOptions, betterAuth } from "better-auth"
import { admin, magicLink, organization } from "better-auth/plugins"
import { logMagicLinkToServerConsole } from "./handlers/magic-link"

export const coreBetterAuthConfig = {
	user: {
		additionalFields: {
			theme: { type: "string" },
			isTest: { type: "boolean", defaultValue: false },
		},
	},
	plugins: [
		magicLink({
			sendMagicLink: logMagicLinkToServerConsole,
			//disableSignUp: true
		}),
		admin(),
		organization(),
	],
} as const


export function initBetterAuth(opts: Omit<BetterAuthOptions, "plugins"> & { additionalPlugins?: BetterAuthOptions["plugins"] }) {
	"user server"

	const plugins = [...(coreBetterAuthConfig.plugins ?? []), ...(opts.additionalPlugins ?? [])]
	const mergedOpts = {
		...coreBetterAuthConfig,
		...opts,
		plugins,
	} as BetterAuthOptions

	return betterAuth(mergedOpts)
}
