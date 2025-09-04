import { TermsMockup } from "ui-solid/mockups"
import { createFileRoute } from "@tanstack/solid-router"

export const Route = createFileRoute("/_public/_company/terms")({
	component: TermsMockup,
})
