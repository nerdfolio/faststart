import { QueryClient, QueryClientProvider } from "@tanstack/solid-query"
import type { User } from "better-auth"
import type { createAuthClient } from "better-auth/solid"
import {
	type Accessor,
	type Component,
	createContext,
	createEffect,
	onMount,
	type ParentProps,
	useContext,
} from "solid-js"

type AuthClient = ReturnType<typeof createAuthClient>
type ContextValue = {
	authClient: AuthClient
	session: ReturnType<AuthClient["useSession"]>
	sessionPending: () => boolean
	sessionUser: () => User | undefined
	onAuthChange?: (user: User | undefined) => void
	logout: AuthClient["signOut"]
	navigateTo: (to: string) => Promise<void> | void
	navigateToLoginSuccess: () => Promise<void>
	NavigateToLogin: Component
	/**
	 * callback for multi-step flows like magic-link or social login
	 * @default to loginSuccessUrl
	 */
	callbackUrl: Accessor<string>
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
	props: ParentProps<
		{
			authClient: C
			loginUrl: string
			loginSuccessUrl: string | Accessor<string>
			logOutSuccessUrl?: string
			callbackUrl?: string
		} & Pick<ContextValue, "navigateTo" | "onAuthChange">
	>
) {
	const defaultProps = {
		logOutSuccessUrl: "/",
	} as const

	const session = props.authClient.useSession()
	const sessionUser = () => session().data?.user
	const sessionPending = () => session().isPending

	createEffect(() => {
		// a way to initialize user in related subsystems like remult
		const user = sessionUser()
		props.onAuthChange?.(user)

		// if (hadUser && !user) {
		// 	// if user was previously defined but now undefined, then logout just happened
		// 	window.location.href = props.logOutSuccessUrl ?? defaultProps.logOutSuccessUrl
		// }
		// return !!user
	}, false)

	function NavigateToLogin() {
		onMount(() => props.navigateTo(`${props.loginUrl}?next=${props.loginSuccessUrl}`))
		return null
	}

	async function navigateToLoginSuccess() {
		// put in brief delay before redirecting to work around bug in better-auth + possible solidjs proxy object
		// that returns {isPrending: false, data: null, error: null} in session() even though user is logged in
		// It seems that better-auth + solidjs needs a bit of time for various states to be consistent
		const successUrl = new URLSearchParams(window.location.search).get("next")
		setTimeout(() => props.navigateTo(successUrl ?? "/dashboard"), 25)
	}

	const ctx = {
		authClient: props.authClient,
		session,
		sessionPending,
		sessionUser,
		logout: async () => {
			const _ = await props.authClient.signOut()
			setTimeout(() => {
				// hard reload page to clear memory
				window.location.href = props.logOutSuccessUrl ?? defaultProps.logOutSuccessUrl
			}, 10)

			// return to make typescript happy
			return _ as ReturnType<AuthClient["signOut"]>
		},
		navigateTo: props.navigateTo,
		navigateToLoginSuccess,
		NavigateToLogin,
		callbackUrl: () =>
			props.callbackUrl ??
			(typeof props.loginSuccessUrl === "function" ? props.loginSuccessUrl() : props.loginSuccessUrl),
	}

	const queryClient = new QueryClient()

	return (
		<QueryClientProvider client={queryClient}>
			<BetterAuthContext.Provider value={ctx}>{props.children}</BetterAuthContext.Provider>
		</QueryClientProvider>
	)
}
