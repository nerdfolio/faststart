import { anonymousClient, inferAdditionalFields } from "better-auth/client/plugins"
import { createAuthClient } from "better-auth/solid"
import type { auth } from "./auth"

const { signIn, signOut, useSession } = createAuthClient({
	plugins: [anonymousClient(), inferAdditionalFields<typeof auth>()],
})

export { signIn, signOut, useSession }
