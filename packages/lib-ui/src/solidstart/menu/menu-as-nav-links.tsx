import { A } from "@solidjs/router"
import { type ComponentProps, For } from "solid-js"
import { type NavMenu, cn } from "../../utils"

export function MenuAsNavLinks(props: ComponentProps<"nav"> & { menu: NavMenu; linkClass?: string }) {
	return (
		<nav class={cn("flex flex-wrap justify-center gap-10", props.class)}>
			<For each={props.menu.items}>
				{(item) => (
					<A href={item.href} class={props.linkClass}>
						{item.title}
					</A>
				)}
			</For>
		</nav>
	)
}
