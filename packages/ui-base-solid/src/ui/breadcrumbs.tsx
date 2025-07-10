import { type Accessor, For, Show } from "solid-js"
import {
	Breadcrumb,
	BreadcrumbItem,
	BreadcrumbLink,
	BreadcrumbList,
	BreadcrumbSeparator,
} from "../ui/breadcrumb"
import type { AdaptedLink } from "./link-adapter"

export function Breadcrumbs(props: { crumbs: Accessor<string[]>; Link: AdaptedLink }) {
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
									<BreadcrumbLink as={props.Link} href={`/${crumb}`}>
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
