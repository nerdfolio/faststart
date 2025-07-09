"user server"
import { guestList } from "@nerdfolio/ba-guest-list"
import { initBetterAuth } from "core/auth/config"

export const auth = initBetterAuth({
	// database: remultAdapter(remultApi.getRemult(), {
	// 	authEntities: { Account, Session, User, Verification },
	// }),
	plugins: [
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