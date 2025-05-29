import { A, useCurrentMatches } from "@solidjs/router"
import { For, Show, createMemo } from "solid-js"
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbSeparator } from "../ui/breadcrumb"

export default function Breadcrumbs() {
	const crumbs = useBreadcrumbs()

	return (
		<Breadcrumb>
			<BreadcrumbList>
				<For each={crumbs()}>
					{(crumb, idx) => (
						<>
							<BreadcrumbItem>
								<Show when={idx() < crumbs().length - 1} fallback={<BreadcrumbLink current>{crumb}</BreadcrumbLink>}>
									<BreadcrumbLink as={A} href={`/${crumb}`}>
										{crumb}
									</BreadcrumbLink>
									<BreadcrumbSeparator />
								</Show>
							</BreadcrumbItem>
						</>
					)}
				</For>
			</BreadcrumbList>
		</Breadcrumb>
	)
}

export function useBreadcrumbs() {
	const matches = useCurrentMatches()

	// Note: slice(1) to exclude the first "/"
	return createMemo(() => matches().slice(-1)[0].path.split("/").slice(1))
}
