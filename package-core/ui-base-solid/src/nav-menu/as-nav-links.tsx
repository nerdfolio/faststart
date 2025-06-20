import { type ComponentProps, For } from "solid-js"
import DefaultLink, { type LinkComponent } from "../ui/default-link"
import { cn } from "../utils"
import type { NavMenuItem } from "./types"

export default function MenuAsNavLinks(
	props: ComponentProps<"nav"> & {
		items: NavMenuItem[]
		label?: string
		linkComponent?: LinkComponent
		linkClass?: string
	}
) {
	const Link = props.linkComponent ?? DefaultLink

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
