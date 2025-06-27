"user server"
import { guestList } from "@nerdfolio/ba-guest-list"
import { remultAdapter } from "@nerdfolio/remult-better-auth"
import { betterAuth } from "better-auth"
import { coreBetterAuthConfig, initBetterAuth } from "fastcore/auth/solidstart"
import { Account, Session, User, Verification } from "fastcore/models/auth-models"
import type { Remult } from "remult"
import { remultApi } from "./remult-api"

console.log("initializing auth......")
console.log("remultApi", remultApi)
console.log("remultAdapter", remultAdapter)
// const adapter = remultAdapter({} as Remult, {
// 	authEntities: {},
// })
// console.log("------------------", adapter)

export const auth = initBetterAuth({
	// database: remultAdapter(new Remult(), {
	// 	authEntities: {},
	// }),
	plugins: [
		guestList({
			allowGuests: [
				{ name: "Alice", role: "admin" },
				{ name: "Bob", role: "user" },
				{ name: "Charlie", role: "user" },
			],
			revealNames: true,
		}),
	],
})

// export const auth = betterAuth({
// 	plugins: [
// 		guestList({
// 			allowGuests: [
// 				{ name: "Alice", role: "admin" },
// 				{ name: "Bob", role: "user" },
// 				{ name: "Charlie", role: "user" },
// 			],
// 			revealNames: true,
// 		}),
// 	],
// })
