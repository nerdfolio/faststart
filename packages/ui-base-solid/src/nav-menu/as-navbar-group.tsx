import { For } from "solid-js"
import type { AdaptedLink } from "../ui/link-adapter"
import { NavigationMenu, NavigationMenuTrigger } from "../ui/navigation-menu"
import type { NavMenuItem } from "./types"

export function MenuAsNavbarGroup(props: { items: NavMenuItem[]; Link: AdaptedLink; linkClass?: string }) {
	return (
		<NavigationMenu class="flex">
			<For each={props.items}>
				{({ label, href }) => (
					<NavigationMenuTrigger as={props.Link} href={href ?? ""} class={props.linkClass}>
						{label}
					</NavigationMenuTrigger>
				)}
			</For>
		</NavigationMenu>
	)
}
