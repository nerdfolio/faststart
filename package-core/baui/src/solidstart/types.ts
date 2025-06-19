import { magicLinkClient } from "better-auth/client/plugins"
import { createAuthClient } from "better-auth/solid"


// HACK: make an unused client to get its types. There probably is a better way
const _authClient = createAuthClient({
	plugins: [
		magicLinkClient()
	],
})

export type BetterAuthClient = typeof _authClient

export type SessionAccessor = ReturnType<BetterAuthClient["useSession"]>
