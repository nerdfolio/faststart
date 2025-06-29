import { guestListClient } from "@nerdfolio/ba-guest-list"
import { inferAdditionalFields, magicLinkClient } from "better-auth/client/plugins"
import { createAuthClient } from "better-auth/solid"
import { makeSessionAccessors } from "core/auth/solidstart"
import { Remult } from "remult"
import type { auth } from "./auth"

export const authClient = createAuthClient({
	plugins: [
		magicLinkClient(),
		guestListClient(),
		inferAdditionalFields<typeof auth>()
	],
})

export async function signOutWithRemult() {
	const res = await authClient.signOut()
	remultClient.user = undefined
	return res
}



export const { authUser } = makeSessionAccessors(authClient)

// export type SessionResponse = typeof authClient.$Infer.Session
// export type AuthSession = (typeof authClient.$Infer.Session)["session"]
// export type AuthUser = (typeof authClient.$Infer.Session)["user"]

export const remultClient = new Remult({ url: import.meta.env.VITE_REMULT_ROOT_PATH })
