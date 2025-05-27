import { NavigationMenu } from "@kobalte/core/navigation-menu"
import { A } from "@solidjs/router"
import { NavigationMenuTrigger } from "lib-ui/solidstart/ui/navigation-menu"
import { For } from "solid-js"
import type { MenuTree } from "./menu-type"

export function MenuAsNavbarGroup(props: { menu: MenuTree; linkClass?: string }) {
	return (
		<NavigationMenu class="flex">
			<For each={props.menu.children}>
				{({ label, href }) => (
					<NavigationMenuTrigger as={A} href={href ?? ""} class={props.linkClass}>
						{label}
					</NavigationMenuTrigger>
				)}
			</For>
		</NavigationMenu>
	)
}
