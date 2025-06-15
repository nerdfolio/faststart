import { anonymousClient, inferAdditionalFields } from "better-auth/client/plugins"
import { createAuthClient } from "better-auth/solid"
import type { auth } from "./auth"

export const authClient = createAuthClient({
	plugins: [anonymousClient(), inferAdditionalFields<typeof auth>()],
})
