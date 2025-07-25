import { MockDashboard } from "@nerdfolio/ui-base-solid/layouts"
import { createFileRoute } from "@tanstack/solid-router"

export const Route = createFileRoute("/_protected/dashboard")({
	component: MockDashboard,
})
