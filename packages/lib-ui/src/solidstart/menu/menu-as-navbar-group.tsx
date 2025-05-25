import { NavigationMenu } from "@kobalte/core/navigation-menu"
import { A } from "@solidjs/router"
import { For } from "solid-js"
import { NavigationMenuTrigger } from "lib-ui/solidstart/ui/navigation-menu"
import type { NavMenu } from "../../utils"

export function MenuAsNavbarGroup(props: { menu: NavMenu }) {
	return (
		<NavigationMenu class="flex">
			<For each={props.menu.items}>
				{({ title, href }) => (
					<NavigationMenuTrigger as={A} href={href}>
						{title}
					</NavigationMenuTrigger>
				)}
			</For>
		</NavigationMenu>
	)
}
