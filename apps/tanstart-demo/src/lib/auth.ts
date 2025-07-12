"user server"
import { guestList } from "@nerdfolio/ba-guest-list"
import { remultAdapter } from "@nerdfolio/remult-better-auth"
import { initBetterAuth } from "core/auth/config"
import * as authEntities from "core/models/auth-models"

export const auth = initBetterAuth({
	database: remultAdapter({ authEntities }),
	additionalPlugins: [
		guestList({
			allowGuests: [
				{ name: "Alice", role: "admin" },
				{ name: "Bob", role: "user" },
				{ name: "Charlie", role: "user" },
			],
			revealNames: true,
			emailDomainName: "example.com",
		}),
	],
})