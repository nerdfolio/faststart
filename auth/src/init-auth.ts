import { type BetterAuthOptions, betterAuth } from "better-auth"
import { type DB, drizzleAdapter } from "better-auth/adapters/drizzle"
import { magicLink } from "better-auth/plugins"
import { authSchema } from "database"
import { logMagicLinkToServerConsole } from "./handlers/magic-link"


export function initServerAuth(d1Database: DB, optionsOverride?: Record<string, unknown>) {
	"use server"
	const user = {
		additionalFields: {
			theme: { type: "string" },
			isTest: { type: "boolean", defaultValue: false },
		},
	} satisfies BetterAuthOptions["user"]

	const defaultOptions = {
		user,
		plugins: [
			magicLink({
				sendMagicLink: logMagicLinkToServerConsole,
				//disableSignUp: true
			}),
		],
	}

	return betterAuth({
		database: drizzleAdapter(d1Database, { provider: "sqlite", schema: authSchema }),
		...defaultOptions,
		...optionsOverride,
	})
}
