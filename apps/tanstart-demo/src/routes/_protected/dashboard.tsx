import { DashboardMockup } from "@nerdfolio/ui-base-solid/mockups"
import { createFileRoute } from "@tanstack/solid-router"

export const Route = createFileRoute("/_protected/dashboard")({
	component: DashboardMockup,
})
