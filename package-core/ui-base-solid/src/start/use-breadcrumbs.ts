import { useCurrentMatches } from "@solidjs/router"
import { createMemo } from "solid-js"

export function useBreadcrumbs() {
	const matches = useCurrentMatches()

	// Note: slice(1) to exclude the first "/"
	return createMemo(() => matches().slice(-1)[0].path.split("/").slice(1))
}
