import type { User } from "better-auth"
import type { createAuthClient } from "better-auth/solid"
import { createContext, createEffect, type ParentProps, useContext } from "solid-js"

type AuthClient = ReturnType<typeof createAuthClient>
type ContextValue = {
	authClient: AuthClient
	session: ReturnType<AuthClient["useSession"]>
	sessionPending: () => boolean
	sessionUser: () => User | undefined
	signOut: AuthClient["signOut"]
	onAuthChange?: (user: User | undefined) => void
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
		onAuthChange?: ContextValue["onAuthChange"]
	}>
) {
	const session = props.authClient.useSession()
	const sessionPending = () => session().isPending
	const sessionUser = () => session().data?.user

	createEffect(() => {
		// a way to initialize user in related subsystems like remult
		props.onAuthChange?.(sessionUser())
	})

	const ctx = {
		authClient: props.authClient,
		session,
		sessionPending,
		sessionUser,
		signOut: props.authClient.signOut,
	}

	return <BetterAuthContext.Provider value={ctx}>{props.children}</BetterAuthContext.Provider>
}
