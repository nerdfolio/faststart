import type { JSXElement, ParentProps } from "solid-js"

export function NavbarLayout(
	props: ParentProps<{ branding: JSXElement; userMenu: JSXElement; menus: JSXElement; footer?: JSXElement }>
) {
	const footer = props.footer ?? null
	return (
		<div>
			<div class="flex justify-between px-8 py-2 border-b">
				{props.branding}
				{props.menus}
				{props.userMenu}
			</div>
			<div class="min-h-svh">{props.children}</div>
			{footer}
		</div>
	)
}
