import { guestListClient } from "ba-guest-list/client"
import { inferAdditionalFields } from "better-auth/client/plugins"
import { createAuthClient } from "better-auth/solid"
import { Remult } from "remult"
import type { auth } from "./auth"

export const authClient = createAuthClient({
	plugins: [guestListClient(), inferAdditionalFields<typeof auth>()],
})

export const remultClient = new Remult({ url: import.meta.env.VITE_REMULT_ROOT_PATH })
