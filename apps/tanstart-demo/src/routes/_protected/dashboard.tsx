import { DashboardMockup } from "ui-solid/mockups"
import { createFileRoute } from "@tanstack/solid-router"

export const Route = createFileRoute("/_protected/dashboard")({
	component: DashboardMockup,
})
