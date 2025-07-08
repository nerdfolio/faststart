import { AuthRequired } from "@nerdfolio/ui-better-auth/tanstart"
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
