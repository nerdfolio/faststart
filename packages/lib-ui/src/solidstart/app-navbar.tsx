import { A } from "@solidjs/router"
import { NavigationMenu, NavigationMenuTrigger } from "lib-ui/solid/navigation-menu"
import { type ComponentProps, For, type JSXElement, Show } from "solid-js"
import type { NavMenu } from "../utils"

export default function AppNavbar(
	props: ComponentProps<"div"> & { AppBranding: JSXElement; UserMenu: JSXElement; navMenu: NavMenu }
) {
	return (
		<div class="flex justify-between px-8 py-2 border-b">
			{props.AppBranding}
			<Show when={props.navMenu}>
				<NavigationMenu>
					<For each={props.navMenu.items}>
						{({ title, href }) => (
							<NavigationMenuTrigger as={A} href={href}>
								{title}
							</NavigationMenuTrigger>
						)}
					</For>
				</NavigationMenu>
			</Show>

			<NavigationMenu>{props.UserMenu}</NavigationMenu>
		</div>
	)
}
