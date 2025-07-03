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
	signInRedirect?: string
	signOutRedirect?: string
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
		signInRedirect?: string
		signOutRedirect?: string
	}>
) {
	const session = props.authClient.useSession()
	const sessionUser = () => session().data?.user
	const sessionPending = () => session().isPending

	createEffect((hadUser: boolean) => {
		// a way to initialize user in related subsystems like remult
		const user = sessionUser()
		props.onAuthChange?.(user)

		if (hadUser && !user) {
			// if user was previously defined but now undefined, then logout just happened
			window.location.href = props.signOutRedirect ?? "/"
		}
		return !!user
	}, false)

	const ctx = {
		authClient: props.authClient,
		session,
		sessionPending,
		sessionUser,
		signOut: props.authClient.signOut,
		signInRedirect: props.signInRedirect,
	}

	return <BetterAuthContext.Provider value={ctx}>{props.children}</BetterAuthContext.Provider>
}
