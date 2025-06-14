import type { BetterAuthOptions } from "better-auth"
import { magicLink } from "better-auth/plugins"
import { logMagicLinkToServerConsole } from "./handlers/magic-link"

type BetterAuthSchemaOptions = Pick<BetterAuthOptions, "user" | "account" | "session" | "verification">
const coreBetterAuthSchema: BetterAuthSchemaOptions = {
	user: {
		fields: { email: "email_address" },
		additionalFields: {
			theme: { type: "string" },
			isTest: { type: "boolean", defaultValue: false },
		},
	},
}

export const coreBetterAuthConfig: BetterAuthOptions = {
	...coreBetterAuthSchema,
	plugins: [
		magicLink({
			sendMagicLink: logMagicLinkToServerConsole,
			//disableSignUp: true
		}),
	],
}

//
// Export "auth" so remult-better-auth config-parser will pick it up for auth schema generation.
// This "auth" object is only used for that. To fully configure better-auth, we
// need to create an "auth.ts" file and call betterAuth({ ...coreBetterAuthSchema, .... })
// with the proper database adapter.
export const auth = { options: coreBetterAuthSchema }
