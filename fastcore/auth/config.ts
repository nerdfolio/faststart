import { type BetterAuthOptions, type BetterAuthPlugin, betterAuth } from "better-auth"
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

export function getCoreOpts(extraPlugins: BetterAuthPlugin[]) {
	return {
		...coreBetterAuthConfig,
		plugins: [...coreBetterAuthConfig.plugins, ...extraPlugins],
	}
}

export function initBetterAuth(opts: BetterAuthOptions) {
	// NOTE: 6/27/2005. for some reason, vinxi SSR doesn't call this function. For now we'd have
	// to import coreBetterAuthConfig and call betterAuth ourselves in individual apps
	//
	const plugins = [...(coreBetterAuthConfig.plugins ?? []), ...(opts.plugins ?? [])]
	const mergedOpts = {
		...coreBetterAuthConfig,
		...opts,
		plugins,
	} as BetterAuthOptions

	console.log("mergedOpts", mergedOpts)

	return betterAuth(mergedOpts)
}
