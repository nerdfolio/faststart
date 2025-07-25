// src/routes/index.tsx
import { createFileRoute } from "@tanstack/solid-router"

export const Route = createFileRoute("/_public/")({
	component: Home,
})

function Home() {
	return <div>Home page</div>
}
