import { type ComponentProps, For } from "solid-js"
import SmartLink from "../../solid/ui/smart-link"
import { type NavMenu, cn } from "../../utils"

export function MenuAsNavLinks(props: ComponentProps<"nav"> & { menu: NavMenu; linkClass?: string }) {
	return (
		<nav class={cn("flex flex-wrap justify-center gap-10", props.menu.rendererClass, props.class)}>
			<For each={props.menu.items}>
				{(item) => (
					<SmartLink href={item.href} class={props.linkClass}>
						{item.title}
					</SmartLink>
				)}
			</For>
		</nav>
	)
}
