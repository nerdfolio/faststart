import { NavigationMenu } from "@kobalte/core/navigation-menu"
import { A } from "@solidjs/router"
import { NavigationMenuTrigger } from "lib-ui/solidstart/ui/navigation-menu"
import { For } from "solid-js"
import type { NavMenu } from "../../utils"

export function MenuAsNavbarGroup(props: { menu: NavMenu; linkClass?: string }) {
	return (
		<NavigationMenu class="flex">
			<For each={props.menu.items}>
				{({ title, href }) => (
					<NavigationMenuTrigger as={A} href={href} class={props.linkClass}>
						{title}
					</NavigationMenuTrigger>
				)}
			</For>
		</NavigationMenu>
	)
}
