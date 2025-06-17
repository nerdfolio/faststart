import { anonymousClient, inferAdditionalFields } from "better-auth/client/plugins"
import { createAuthClient } from "better-auth/solid"
import { Remult } from "remult"
import type { auth } from "./auth"

export const authClient = createAuthClient({
	plugins: [anonymousClient(), inferAdditionalFields<typeof auth>()],
})

export const remultClient = new Remult({ url: import.meta.env.VITE_REMULT_ROOT_PATH })