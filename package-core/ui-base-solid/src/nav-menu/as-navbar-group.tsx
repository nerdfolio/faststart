import { For } from "solid-js"
import type { LinkComponent } from "../ui/default-link"
import DefaultLink from "../ui/default-link"
import { NavigationMenu, NavigationMenuTrigger } from "../ui/navigation-menu"
import type { NavMenuItem } from "./types"

export default function MenuAsNavbarGroup(props: {
	items: NavMenuItem[]
	linkComponent?: LinkComponent
	linkClass?: string
}) {
	const Link = props.linkComponent ?? DefaultLink
	return (
		<NavigationMenu class="flex">
			<For each={props.items}>
				{({ label, href }) => (
					<NavigationMenuTrigger as={Link} href={href ?? ""} class={props.linkClass}>
						{label}
					</NavigationMenuTrigger>
				)}
			</For>
		</NavigationMenu>
	)
}
