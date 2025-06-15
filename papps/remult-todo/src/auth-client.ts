import { createAuthClient } from "better-auth/client"
import { anonymousClient, inferAdditionalFields } from "better-auth/client/plugins"
import type { auth } from "./auth"

const { signIn, signOut, useSession } = createAuthClient({
	plugins: [anonymousClient(), inferAdditionalFields<typeof auth>()],
})

export { signIn, signOut, useSession }
