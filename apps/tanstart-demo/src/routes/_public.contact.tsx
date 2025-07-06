import { createFileRoute } from "@tanstack/solid-router"

export const Route = createFileRoute("/_public/contact")({
	component: About,
})

function About() {
	return <h1>Contact</h1>
}
