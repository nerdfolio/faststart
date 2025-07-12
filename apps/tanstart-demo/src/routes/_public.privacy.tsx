import { createFileRoute } from "@tanstack/solid-router"

export const Route = createFileRoute("/_public/privacy")({
	component: Privacy,
})

function Privacy() {
	return <h1>About page</h1>
}
