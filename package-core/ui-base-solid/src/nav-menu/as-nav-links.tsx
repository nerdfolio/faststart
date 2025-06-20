import { type ComponentProps, For } from "solid-js"
import type { LinkComponent } from "../ui/default-link"
import { cn } from "../utils"
import type { NavMenuItem } from "./types"

export default function MenuAsNavLinks(
	props: ComponentProps<"nav"> & {
		items: NavMenuItem[]
		label?: string
		Link: LinkComponent
		linkClass?: string
	}
) {
	return (
		<nav class={cn("flex flex-wrap justify-center gap-10", props.class)}>
			<For each={props.items}>
				{(item) => (
					<props.Link href={item.href ?? ""} class={props.linkClass}>
						{item.label}
					</props.Link>
				)}
			</For>
		</nav>
	)
}
