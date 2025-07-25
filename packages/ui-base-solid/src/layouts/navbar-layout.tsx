import { type JSXElement, type ParentProps, Show } from "solid-js"
import { useUi } from "~/context"
import { ThemeSelector } from "../theming/theme-selector"
import { cn } from "../utils"

export function NavbarLayout(
	props: ParentProps<{
		userMenu: JSXElement
		menus: JSXElement
		footer?: JSXElement
		themeSelector?: boolean
	}>
) {
	const { Branding } = useUi()
	const branding = <Branding />

	const footer = props.footer ?? null
	return (
		<div>
			<div class={cn("flex justify-between py-2 border-b", props.themeSelector ? "pl-6 pr-1" : "px-6")}>
				{branding}
				{props.menus}
				<div class="flex flex-row gap-1">
					{props.userMenu}
					<Show when={props.themeSelector}>
						<ThemeSelector />
					</Show>
				</div>
			</div>
			<div class="min-h-svh">{props.children}</div>
			{footer}
		</div>
	)
}
