import { type JSXElement, type ParentProps, Show } from "solid-js"
import { ThemeToggle } from "../ui/theme-toggle"

export function NavbarLayout(
	props: ParentProps<{
		branding: JSXElement
		userMenu: JSXElement
		menus: JSXElement
		footer?: JSXElement
		hideThemeToggle?: boolean
	}>
) {
	const footer = props.footer ?? null
	return (
		<div>
			<div class="flex justify-between px-8 py-2 border-b">
				{props.branding}
				{props.menus}
				<div class="flex flex-row gap-1">
					<Show when={!props.hideThemeToggle}>
						<ThemeToggle />
					</Show>
					{props.userMenu}
				</div>
			</div>
			<div class="min-h-svh">{props.children}</div>
			{footer}
		</div>
	)
}
