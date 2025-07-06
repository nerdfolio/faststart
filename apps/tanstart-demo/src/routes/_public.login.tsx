import { createFileRoute } from "@tanstack/solid-router"

export const Route = createFileRoute("/_public/login")({
	component: About,
})

function About() {
	return <h1>Roadmap</h1>
}
