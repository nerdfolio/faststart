import { type ComponentProps, For } from "solid-js"
import { useUi } from "../context"
import { cn } from "../utils"
import type { NavMenuItem } from "./types"

export function MenuAsNavLinks(
	props: ComponentProps<"nav"> & {
		items: NavMenuItem[]
		label?: string
		linkClass?: string
	}
) {
	const { HrefLink } = useUi()
	return (
		<nav class={cn("flex flex-wrap justify-center gap-10", props.class)}>
			<For each={props.items}>
				{(item) => (
					<HrefLink href={item.href ?? ""} class={props.linkClass}>
						{item.label}
					</HrefLink>
				)}
			</For>
		</nav>
	)
}
