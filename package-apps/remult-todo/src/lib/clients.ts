import { guestListClient } from "@nerdfolio/ba-guest-list"
import { inferAdditionalFields } from "better-auth/client/plugins"
import { createAuthClient } from "better-auth/solid"
import { Remult } from "remult"
import type { auth } from "./auth"

export const authClient = createAuthClient({
	plugins: [guestListClient(), inferAdditionalFields<typeof auth>()],
})

// export type SessionResponse = SessionResponseType<typeof authClient>
// export type AuthSession = AuthSessionType<typeof authClient>
// export type AuthUser = AuthUserType<typeof authClient>

export const remultClient = new Remult({ url: import.meta.env.VITE_REMULT_ROOT_PATH })