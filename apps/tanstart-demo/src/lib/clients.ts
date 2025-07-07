import { guestListClient } from "@nerdfolio/ba-guest-list"
import type { User } from "better-auth"
import { inferAdditionalFields, magicLinkClient } from "better-auth/client/plugins"
import { createAuthClient } from "better-auth/solid"
import { baUserToRemultUser } from "core/utils/remult-ba"
import { Remult } from "remult"
import type { auth } from "./auth"

export const authClient = createAuthClient({
	plugins: [magicLinkClient(), guestListClient(), inferAdditionalFields<typeof auth>()],
})

export const remultClient = new Remult({ url: __REMULT_API_PATH__ })

export function syncRemultUser(baUser: User | undefined) {
	if (baUser) {
		remultClient.user = baUserToRemultUser(baUser)
	} else {
		remultClient.user = undefined
	}
}
