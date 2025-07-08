import { Navigate, useLocation } from "@tanstack/solid-router"

export function NavigateToLogin(props: { loginUrl: string }) {
	const pathname = useLocation({ select: (location) => location.pathname })
	return <Navigate to={`${props.loginUrl}?next=${pathname()}`} viewTransition />
}
