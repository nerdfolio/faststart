import { Navigate } from "@solidjs/router"
import { createSignal, type ParentProps, Show } from "solid-js"
import { useBetterAuth } from "../solid/context"

const DEFAULT_LOGIN_URL = "/login" as const

type AuthRequiredProps = ParentProps & {
	loginUrl?: string
}
export function AuthRequired(props: AuthRequiredProps) {
	const { sessionPending, sessionUser, session } = useBetterAuth()

	// NOTE: 6/27/2005. Better auth seems to have a bug where user is authenticated, isPending is false,
	// but for a split second, "data" is also null. We work around this by forcing a short delay.
	// NOTE: this may actually be a solidjs proxy issue. The unchanged session() proxy (from logout)
	// may have been returned without isPending being set to false
	const [ready, setReady] = createSignal(!!session().data)
	if (!session().isPending && !ready()) {
		setTimeout(() => {
			setReady(true)
		}, 50)
	}

	return (
		<Show when={!sessionPending() && ready()}>
			<Show when={sessionUser()} fallback={<Navigate href={props.loginUrl || DEFAULT_LOGIN_URL} />}>
				{props.children}
			</Show>
		</Show>
	)
}
