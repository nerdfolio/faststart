import { createFileRoute } from "@tanstack/solid-router"

export const Route = createFileRoute("/_public/terms")({
	component: Terms,
})

function Terms() {
	return <h1>About page</h1>
}
