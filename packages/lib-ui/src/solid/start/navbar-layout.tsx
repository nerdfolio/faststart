import type { ComponentProps, JSXElement } from "solid-js"

export default function NavbarLayout(props: ComponentProps<"div">) {
	return <div>{props.children}</div>
}

NavbarLayout.Navbar = function NB(
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

NavbarLayout.ContentArea = (props: ComponentProps<"div">) => <div class="min-h-svh">{props.children}</div>
