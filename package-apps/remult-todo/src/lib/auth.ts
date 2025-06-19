"user server"
import { guestList } from "@nerdfolio/ba-guest-list"
import { initBetterAuth } from "remult-core/solidstart"
import { remultApi } from "./remult-api"

export const auth = initBetterAuth((await remultApi.getRemult()).dataProvider, {
	plugins: [
		guestList({
			allowGuests: [
				{ name: "Alice", role: "admin" },
				{ name: "Bob", role: "user" },
				{ name: "Charlie", role: "user" },
			],
			revealNames: true
		})
	],
})
