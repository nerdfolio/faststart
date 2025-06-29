import type { User } from "better-auth"
import type { createAuthClient } from "better-auth/solid"
import { createContext, type ParentProps, useContext } from "solid-js"

type AuthClient = ReturnType<typeof createAuthClient>
type ContextValue = {
	authClient: AuthClient
	session: ReturnType<AuthClient["useSession"]>
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
		onAuthenticated?: ContextValue["onAuthenticated"]
		onSignout?: ContextValue["onSignout"]
	}>
) {
	const ctx = {
		authClient: props.authClient,
		session: props.authClient.useSession(),
		signOut: async () =>
			props.authClient.signOut({
				fetchOptions: { onSuccess: props.onSignout },
			}),
		onSignout: props.onSignout,
		onAuthenticated: props.onAuthenticated, // may be triggered for login or auth-guard scenarios
	} as ContextValue

	return <BetterAuthContext.Provider value={ctx}>{props.children}</BetterAuthContext.Provider>
}
