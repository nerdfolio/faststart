import { type JSXElement, type ParentProps, Show } from "solid-js"
import { useBetterAuth } from "../solid/context"

export function AuthGuard(props: ParentProps<{ fallback: JSXElement }>) {
	const { sessionPending, sessionUser } = useBetterAuth()

	return (
		<Show when={!sessionPending()}>
			<Show when={sessionUser()} fallback={props.fallback}>
				{props.children}
			</Show>
		</Show>
	)
}
