import { useCurrentMatches } from "@solidjs/router"
import {
	Breadcrumb,
	BreadcrumbItem,
	BreadcrumbLink,
	BreadcrumbList,
	BreadcrumbSeparator,
} from "lib-ui/solid/breadcrumb"
import { For, createMemo } from "solid-js"

export default function Breadcrumbs() {
	const matches = useCurrentMatches()

	// Note: slice(1) to exclude the first "/"
	const crumbs = createMemo(() => matches().slice(-1)[0].path.split("/").slice(1))

	return (
		<Breadcrumb>
			<BreadcrumbList>
				<For each={crumbs()}>
					{(crumb, idx) => (
						<>
							<BreadcrumbItem>
								<BreadcrumbLink href="/" current={idx() === crumbs().length - 1}>
									{crumb}
								</BreadcrumbLink>
							</BreadcrumbItem>
							{idx() === crumbs().length - 1 ? null : <BreadcrumbSeparator />}
						</>
					)}
				</For>
			</BreadcrumbList>
		</Breadcrumb>
	)
}
