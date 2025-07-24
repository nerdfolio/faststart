import { createFileRoute } from "@tanstack/solid-router"

export const Route = createFileRoute("/_protected/dashboard")({
	component: Dashboard,
})

function Dashboard() {
	return (
		<div class="flex flex-1 flex-col gap-4 p-4">
			<div class="grid auto-rows-min gap-4 md:grid-cols-3">
				<div class="aspect-video rounded-xl bg-muted/50" />
				<div class="aspect-video rounded-xl bg-muted/50" />
				<div class="aspect-video rounded-xl bg-muted/50" />
			</div>
			<div class="min-h-screen flex-1 rounded-xl bg-muted/50 md:min-h-min" />
		</div>
	)
}
