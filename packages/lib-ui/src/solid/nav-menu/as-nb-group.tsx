import { NavigationMenu } from "@kobalte/core/navigation-menu"
import { NavigationMenuTrigger } from "lib-ui/solid/ui/navigation-menu"
import { For } from "solid-js"
import type { LinkComponent } from "./default-link-component"
import DefaultLinkComponent from "./default-link-component"
import type { NavMenuItem } from "./type"

export default function MenuAsNavbarGroup(props: {
	items: NavMenuItem[]
	linkComponent?: LinkComponent
	linkClass?: string
}) {
	const Link = props.linkComponent ?? DefaultLinkComponent
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
