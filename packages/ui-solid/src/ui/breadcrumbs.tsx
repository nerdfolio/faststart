import { type Accessor, For, Show } from "solid-js"
import { useUi } from "../context"
import {
	Breadcrumb,
	BreadcrumbItem,
	BreadcrumbLink,
	BreadcrumbList,
	BreadcrumbSeparator,
} from "./breadcrumb"

export function Breadcrumbs(props: { crumbs: Accessor<string[]> }) {
	const { HrefLink: LinkComponent } = useUi()
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
									<BreadcrumbLink as={LinkComponent} href={`/${crumb}`}>
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
