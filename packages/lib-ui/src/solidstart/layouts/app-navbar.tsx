import { NavigationMenu } from "lib-ui/solidstart/ui/navigation-menu"
import { type ComponentProps, For, type JSXElement, Show } from "solid-js"
import type { Menu } from "../menu/menu-type"

export default function AppNavbar(
	props: ComponentProps<"div"> & { AppBranding: JSXElement; UserMenu: JSXElement; menus: Menu[] }
) {
	return (
		<div class="flex justify-between px-8 py-2 border-b">
			{props.AppBranding}
			<Show when={props.menus}>
				<For each={props.menus}>
					{(menu) => (
						<menu.renderer
							label={menu.label}
							items={menu.items}
							class={menu.rendererClass}
							linkClass={menu.linkClass}
						/>
					)}
				</For>
			</Show>

			<NavigationMenu>{props.UserMenu}</NavigationMenu>
		</div>
	)
}
