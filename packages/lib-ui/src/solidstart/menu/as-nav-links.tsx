import { type ComponentProps, For } from "solid-js"
import SmartLink from "../../solid/ui/smart-link"
import { cn } from "../../utils"
import type { MenuItem } from "./menu-type"

export default function MenuAsNavLinks(
	props: ComponentProps<"nav"> & { items: MenuItem[]; label?: string; linkClass?: string }
) {
	return (
		<nav class={cn("flex flex-wrap justify-center gap-10", props.class)}>
			<For each={props.items}>
				{(item) => (
					<SmartLink href={item.href ?? ""} class={props.linkClass}>
						{item.label}
					</SmartLink>
				)}
			</For>
		</nav>
	)
}
