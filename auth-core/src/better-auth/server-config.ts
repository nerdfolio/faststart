import { type BetterAuthOptions, betterAuth } from "better-auth"
import { admin, magicLink } from "better-auth/plugins"
import { logMagicLinkToServerConsole } from "./handlers/magic-link"

type BetterAuthSchemaOptions = Pick<BetterAuthOptions, "user" | "account" | "session" | "verification">
export const coreBetterAuthSchema: BetterAuthSchemaOptions = {
	user: {
		fields: { email: "email_address" },
		additionalFields: {
			theme: { type: "string" },
			isTest: { type: "boolean", defaultValue: false },
		},
	},
} as const

export const coreBetterAuthConfig: BetterAuthOptions = {
	...coreBetterAuthSchema,
	plugins: [
		magicLink({
			sendMagicLink: logMagicLinkToServerConsole,
			//disableSignUp: true
		}),
		admin(),
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
//
// Export "auth" so remult-better-auth config-parser will pick it up for auth schema generation.
// This "auth" object is only used for that. To fully configure better-auth, we
// need to create an "auth.ts" file and call betterAuth({ ...coreBetterAuthSchema, .... })
// with the proper database adapter.
// export const auth = { options: coreBetterAuthConfig }
