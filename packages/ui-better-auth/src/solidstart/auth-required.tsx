import { Navigate } from "@solidjs/router"
import { createEffect, createSignal, type ParentProps, Show } from "solid-js"
import { useBetterAuth } from "../solid/context"

type AuthRequiredProps = ParentProps & {
	loginUrl?: string
}
export function AuthRequired(props: AuthRequiredProps) {
	const { onAuthenticated, sessionPending, sessionUser } = useBetterAuth()

	// NOTE: 6/27/2005. Better auth seems to have a bug where user is authenticated, isPending is false,
	// but for a split second, "data" is also null. We work around this by forcing a very short delay
	const [ready, setReady] = createSignal(false)
	setTimeout(() => {
		setReady(true)
	}, 50)

	createEffect(() => {
		// a way to initialize user in related subsystems like remult
		if (sessionUser()) {
			onAuthenticated?.(sessionUser()!)
		}
	})

	return (
		<Show when={!sessionPending() && ready()}>
			<Show when={sessionUser()} fallback={<Navigate href={props.loginUrl || "/login"} />}>
				{props.children}
			</Show>
		</Show>
	)
}
