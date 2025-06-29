import { Navigate } from "@solidjs/router"
import { createEffect, createSignal, type ParentProps, Show } from "solid-js"
import { useBetterAuth } from "../solid/context"

type AuthRequiredProps = ParentProps & {
	loginUrl?: string
}
export function AuthRequired(props: AuthRequiredProps) {
	const { onAuthenticated, session } = useBetterAuth()

	// NOTE: 6/27/2005. Better auth seems to have a bug where user is authenticated, isPending is false,
	// but for a split second, "data" is also null. We work around this by forcing a very short delay
	const [ready, setReady] = createSignal(false)
	session()
	setTimeout(() => {
		setReady(true)
	}, 50)

	createEffect(() => {
		// a way to initialize user in related subsystems like remult
		if (session().data?.user) {
			onAuthenticated?.(session().data?.user!)
		}
	})

	return (
		<Show when={!session().isPending && ready()}>
			<Show when={session().data?.user} fallback={<Navigate href={props.loginUrl || "/login"} />}>
				{props.children}
			</Show>
		</Show>
	)
}
