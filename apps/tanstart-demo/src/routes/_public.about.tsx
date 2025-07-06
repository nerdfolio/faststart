import { createFileRoute } from "@tanstack/solid-router"

export const Route = createFileRoute("/_public/about")({
	component: About,
})

function About() {
	return <h1>About page</h1>
}
