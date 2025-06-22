import { type BetterAuthOptions, betterAuth } from "better-auth"
import { admin, magicLink, organization } from "better-auth/plugins"
import { logMagicLinkToServerConsole } from "./handlers/magic-link"

export const coreBetterAuthConfig: BetterAuthOptions = {
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

export function initBetterAuth(opts: BetterAuthOptions) {
	"user server"
	const plugins = [...(coreBetterAuthConfig.plugins ?? []), ...(opts.plugins ?? [])]
	return betterAuth({
		...coreBetterAuthConfig,
		...opts,
		plugins,
	})
}
