import { useRouterState } from "@tanstack/solid-router"
import { createMemo } from "solid-js"
import { Breadcrumbs } from "../../ui/breadcrumbs"

export const RouteBreadcrumbs = () => <Breadcrumbs crumbs={useBreadcrumbs()} />

export function useBreadcrumbs() {
	const matches = useRouterState({ select: (s) => s.matches })

	// Note: slice(1) to exclude the first "/" in the path
	return createMemo(() => matches().slice(-1)[0].fullPath.split("/").slice(1))
}
