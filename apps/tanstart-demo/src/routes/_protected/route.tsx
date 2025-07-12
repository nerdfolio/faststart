import { AuthRequired } from "@nerdfolio/solid-better-auth"
import { createFileRoute, Outlet } from "@tanstack/solid-router"

export const Route = createFileRoute("/_protected")({
	component: ProtectedLayout,
})

function ProtectedLayout() {
	return (
		<AuthRequired>
			<h1>Pathless layout</h1>
			<Outlet />
		</AuthRequired>
	)
}
