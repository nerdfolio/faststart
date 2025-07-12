import { type ParentProps, Show } from "solid-js"
import { useBetterAuth } from "./context"

export function AuthRequired(props: ParentProps) {
	const { sessionPending, sessionUser, NavigateToLogin } = useBetterAuth()

	return (
		<Show when={!sessionPending()}>
			<Show when={sessionUser()} fallback={<NavigateToLogin />}>
				{props.children}
			</Show>
		</Show>
	)
}
