import type { BetterAuthOptions } from "better-auth"
import { createAuthClient } from "better-auth/solid"

// HACK: make an basic client to get its types. There probably is a better way
const _authClient = createAuthClient({ plugins: [] } as BetterAuthOptions)

export type BetterAuthClient = typeof _authClient

export type SessionAccessor = ReturnType<BetterAuthClient["useSession"]>
