"user server"
import { guestList } from "@nerdfolio/ba-guest-list"
import { remultAdapter } from "@nerdfolio/remult-better-auth"
import { initBetterAuth } from "fastcore/auth/solidstart"
import { Account, Session, User, Verification } from "fastcore/models/auth-models"
import { remultApi } from "./remult-api"

export const auth = initBetterAuth({
	database: remultAdapter(remultApi.getRemult(), {
		authEntities: { User, Session, Account, Verification },
	}),
	plugins: [
		guestList({
			allowGuests: [
				{ name: "Alice", role: "admin" },
				{ name: "Bob", role: "user" },
				{ name: "Charlie", role: "user" },
			],
			revealNames: true
		}),
	],
})

console.log("AUTH>>>>", auth)