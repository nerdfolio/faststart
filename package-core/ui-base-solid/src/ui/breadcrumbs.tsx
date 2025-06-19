import { type Accessor, For, Show } from "solid-js"
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbSeparator } from "../ui/breadcrumb"
import type { LinkComponent } from "./default-link"
import DefaultLink from "./default-link"

export function Breadcrumbs(props: { crumbs: Accessor<string[]>; Link?: LinkComponent }) {
	const Link = props.Link ?? DefaultLink
	return (
		<Breadcrumb>
			<BreadcrumbList>
				<For each={props.crumbs()}>
					{(crumb, idx) => (
						<>
							<BreadcrumbItem>
								<Show
									when={idx() < props.crumbs().length - 1}
									fallback={<BreadcrumbLink current>{crumb}</BreadcrumbLink>}
								>
									<BreadcrumbLink as={Link} href={`/${crumb}`}>
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
