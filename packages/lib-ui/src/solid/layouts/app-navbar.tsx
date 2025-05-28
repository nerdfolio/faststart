import type { ComponentProps, JSXElement } from "solid-js"

export default function AppNavbar(
	props: ComponentProps<"div"> & { Branding: JSXElement; UserMenu: JSXElement; Menus: JSXElement }
) {
	return (
		<div class="flex justify-between px-8 py-2 border-b">
			{props.Branding}
			{props.Menus}
			{props.UserMenu}
		</div>
	)
}
