import { NavigationMenu } from "lib-ui/solidstart/ui/navigation-menu"
import { type ComponentProps, type JSXElement, Show } from "solid-js"
import { MenuAsNavbarGroup } from "../../solidstart/menu/menu-as-navbar-group"
import type { MenuTree } from "../menu/menu-type"

export default function AppNavbar(
	props: ComponentProps<"div"> & { AppBranding: JSXElement; UserMenu: JSXElement; navMenu: MenuTree }
) {
	return (
		<div class="flex justify-between px-8 py-2 border-b">
			{props.AppBranding}
			<Show when={props.navMenu}>
				<MenuAsNavbarGroup menu={props.navMenu} />
			</Show>

			<NavigationMenu>{props.UserMenu}</NavigationMenu>
		</div>
	)
}
