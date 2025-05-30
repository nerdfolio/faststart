import { type ComponentProps, For } from "solid-js"
import { cn } from "../utils"
import DefaultLinkComponent, { type LinkComponent } from "./default-link-component"
import type { NavMenuItem } from "./type"

export default function MenuAsNavLinks(
	props: ComponentProps<"nav"> & {
		items: NavMenuItem[]
		label?: string
		linkComponent?: LinkComponent
		linkClass?: string
	}
) {
	const Link = props.linkComponent ?? DefaultLinkComponent

	return (
		<nav class={cn("flex flex-wrap justify-center gap-10", props.class)}>
			<For each={props.items}>
				{(item) => (
					<Link href={item.href ?? ""} class={props.linkClass}>
						{item.label}
					</Link>
				)}
			</For>
		</nav>
	)
}
