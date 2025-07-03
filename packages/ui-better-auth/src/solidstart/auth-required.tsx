import { Navigate } from "@solidjs/router"
import { type ParentProps, Show } from "solid-js"
import { useBetterAuth } from "../solid/context"

const DEFAULT_LOGIN_URL = "/login" as const

type AuthRequiredProps = ParentProps & {
	loginUrl?: string
}
export function AuthRequired(props: AuthRequiredProps) {
	const { sessionPending, sessionUser } = useBetterAuth()

	return (
		<Show when={!sessionPending()}>
			<Show when={sessionUser()} fallback={<Navigate href={props.loginUrl || DEFAULT_LOGIN_URL} />}>
				{props.children}
			</Show>
		</Show>
	)
}
