import { Navigate, useLocation } from "@tanstack/solid-router"
import type { ParentProps } from "solid-js"
import { AuthGuard } from "../solid/auth-guard"

export function AuthRequired(props: ParentProps<{ loginUrl: string }>) {
	return <AuthGuard fallback={<NavigateToLogin loginUrl={props.loginUrl} />} />
}

export function NavigateToLogin(props: { loginUrl: string }) {
	const pathname = useLocation({ select: (location) => location.pathname })
	return <Navigate to={`${props.loginUrl}?next=${pathname()}`} viewTransition />
}
