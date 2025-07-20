import { type JSXElement, type ParentProps, Show } from "solid-js"
import { ThemeSelector } from "../theming/theme-selector"
import { cn } from "../utils"

export function NavbarLayout(
	props: ParentProps<{
		branding: JSXElement
		userMenu: JSXElement
		menus: JSXElement
		footer?: JSXElement
		hideThemeSelector?: boolean
	}>
) {
	const footer = props.footer ?? null
	return (
		<div>
			<div class={cn("flex justify-between py-2 border-b", props.hideThemeSelector ? "px-6" : "pl-6 pr-1")}>
				{props.branding}
				{props.menus}
				<div class="flex flex-row gap-1">
					{props.userMenu}
					<Show when={!props.hideThemeSelector}>
						<ThemeSelector />
					</Show>
				</div>
			</div>
			<div class="min-h-svh">{props.children}</div>
			{footer}
		</div>
	)
}
