import { createFileRoute, Outlet } from "@tanstack/solid-router"

export const Route = createFileRoute("/_protected")({
	component: ProtectedLayout,
})

function ProtectedLayout() {
	return (
		<div>
			<h1>Pathless layout</h1>
			<Outlet />
		</div>
	)
}
