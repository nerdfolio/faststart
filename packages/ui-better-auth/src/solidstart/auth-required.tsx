import { Navigate, useLocation } from "@solidjs/router"
import { createMemo, type ParentProps, Show } from "solid-js"
import { useBetterAuth } from "../solid/context"

const DEFAULT_LOGIN_URL = "/login" as const

function LoginWithNextParam(props: { loginUrl?: string }) {
	const pathname = createMemo(() => useLocation().pathname)

	return <Navigate href={`${props.loginUrl || DEFAULT_LOGIN_URL}?next=${pathname()}`} />
}

type AuthRequiredProps = ParentProps & {
	loginUrl?: string
}
export function AuthRequired(props: AuthRequiredProps) {
	const { sessionPending, sessionUser } = useBetterAuth()

	return (
		<Show when={!sessionPending()}>
			<Show when={sessionUser()} fallback={<LoginWithNextParam />}>
				{props.children}
			</Show>
		</Show>
	)
}
