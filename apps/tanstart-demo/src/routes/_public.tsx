import { createFileRoute, Outlet } from "@tanstack/solid-router"

export const Route = createFileRoute("/_public")({
	component: PublicLayout,
})

function PublicLayout() {
	return (
		<div>
			<h1>Pathless layout</h1>
			<Outlet />
		</div>
	)
}
