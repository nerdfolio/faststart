import { For } from "solid-js"
import { useUi } from "../context"
import { NavigationMenu, NavigationMenuTrigger } from "../ui/navigation-menu"
import type { NavMenuItem } from "./types"

export function MenuAsNavbarGroup(props: { items: NavMenuItem[]; linkClass?: string }) {
	const { LinkComponent } = useUi()
	return (
		<NavigationMenu class="flex">
			<For each={props.items}>
				{({ label, href }) => (
					<NavigationMenuTrigger as={LinkComponent} href={href ?? ""} class={props.linkClass}>
						{label}
					</NavigationMenuTrigger>
				)}
			</For>
		</NavigationMenu>
	)
}
