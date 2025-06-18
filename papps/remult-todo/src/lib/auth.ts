"user server"
import { guestList } from "ba-guest-list/index"
import { initBetterAuth } from "remult-core/solidstart"
import { remultApi } from "./api"

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
