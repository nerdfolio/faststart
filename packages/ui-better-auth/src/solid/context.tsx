import type { User } from "better-auth"
import type { createAuthClient } from "better-auth/client"
import { createContext, type ParentProps, useContext } from "solid-js"

type AuthClient = ReturnType<typeof createAuthClient>
type ContextValue = {
	authClient: AuthClient
	signOut: AuthClient["signOut"]
	onSignout?: (signOutRes?: unknown) => void
	onAuthenticated?: (user: User) => void
}

const BetterAuthContext = createContext<ContextValue>()

export function useBetterAuth() {
	const ctx = useContext(BetterAuthContext)

	if (!ctx) {
		throw new Error("useBetterAuth must be used within a BetterAuthProvider")
	}

	return ctx
}

export function BetterAuthProvider<C extends AuthClient>(
	props: ParentProps<{
		authClient: C
		onAuthenticated?: (user: User) => void
		onSignout?: (signOutRes?: unknown) => Promise<void>
	}>
) {
	const ctx = {
		authClient: props.authClient,
		signOut: async () =>
			props.authClient.signOut({
				fetchOptions: { onSuccess: props.onSignout },
			}),
		onSignout: props.onSignout,
		onAuthenticated: props.onAuthenticated, // may be triggered for login or auth-guard scenarios
	}

	return <BetterAuthContext.Provider value={ctx}>{props.children}</BetterAuthContext.Provider>
}
