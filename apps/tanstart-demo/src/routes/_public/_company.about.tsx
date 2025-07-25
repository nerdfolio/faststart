import { AboutUsMockup } from "@nerdfolio/ui-base-solid/mockups"
import { createFileRoute } from "@tanstack/solid-router"

export const Route = createFileRoute("/_public/_company/about")({
	component: AboutUsMockup,
})
