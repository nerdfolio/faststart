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

	createEffect(() => {
		// a way to initialize user in related subsystems like remult
		props.onAuthChange?.(sessionUser())
	})

	// NOTE: 6/27/2005. Better auth 1.2.10 seems to have a bug where user is authenticated, isPending is false,
	// but for a split second, "data" is also null. This does not happen on the first login from a fresh page load
	// but only on subsequent logout then logins.
	// NOTE: this may actually be a solidjs proxy object issue. The unchanged session() proxy (unchanged from logout)
	// is passed to subsequent checks without isPending being reset to true.
	//
	// Work around: reload page with window.location to clear up memory caches on signOut
	const signOut: AuthClient["signOut"] = (opts = {}) => {
		const { fetchOptions } = opts

		const onSuccess: NonNullable<typeof fetchOptions>["onSuccess"] = (successsCtx) => {
			fetchOptions?.onSuccess?.(successsCtx)

			console.log("reload to clear page memory on logout")
			//window.location.replace(props.signOutRedirect ?? "/")
		}

		return props.authClient.signOut({
			...opts,
			fetchOptions: {
				...fetchOptions,
				onSuccess,
			},
		})
	}

	const ctx = {
		authClient: props.authClient,
		session,
		sessionPending,
		sessionUser,
		signOut,
		signInRedirect: props.signInRedirect,
	}

	return <BetterAuthContext.Provider value={ctx}>{props.children}</BetterAuthContext.Provider>
}
