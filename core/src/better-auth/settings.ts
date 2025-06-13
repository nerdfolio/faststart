import type { BetterAuthOptions } from "better-auth"
import { magicLink } from "better-auth/plugins"
import { logMagicLinkToServerConsole } from "./handlers/magic-link"

type BetterAuthSchemaOptions = Pick<BetterAuthOptions, "user" | "account" | "session" | "verification">
const coreBetterAuthSchema: BetterAuthSchemaOptions = {
	user: {
		additionalFields: {
			theme: { type: "string" },
			isTest: { type: "boolean", defaultValue: false },
		},
	},
}

export const coreBetterAuthConfig = {
	...coreBetterAuthSchema,
	plugins: [
		magicLink({
			sendMagicLink: logMagicLinkToServerConsole,
			//disableSignUp: true
		}),
	],
}
