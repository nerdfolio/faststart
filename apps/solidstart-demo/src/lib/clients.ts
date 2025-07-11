import { guestListClient } from "@nerdfolio/ba-guest-list"
import { inferAdditionalFields, magicLinkClient } from "better-auth/client/plugins"
import { createAuthClient } from "better-auth/solid"
import { Remult } from "remult"
import type { auth } from "./auth"

export const authClient = createAuthClient({
	plugins: [magicLinkClient(), guestListClient(), inferAdditionalFields<typeof auth>()],
})

export const remultClient = new Remult({ url: __REMULT_API_PATH__ })

console.log("remult path", __REMULT_API_PATH__)
