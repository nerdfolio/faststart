import { Navigate, useLocation } from "@solidjs/router"
import { createMemo } from "solid-js"

export function NavigateToLogin(props: { loginUrl: string }) {
	const pathname = createMemo(() => useLocation().pathname)
	return <Navigate href={`${props.loginUrl}?next=${pathname()}`} />
}
