import { A } from "@solidjs/router"
import NavbarUserMenu from "./navbar-user-menu"
import { NavigationMenu, NavigationMenuTrigger } from "lib-ui/solid/navigation-menu"
import type { ComponentProps, JSXElement } from "solid-js"

export default function AppNavbar(props: ComponentProps<"div"> & { AppBranding: JSXElement }) {
	return (
		<div class="flex justify-between px-8 py-2 border-b">
			{props.AppBranding}
			<NavigationMenu>
				<NavigationMenuTrigger as={A} href="/about">
					About
				</NavigationMenuTrigger>
				<NavigationMenuTrigger as={A} href="/roadmap">
					Road map
				</NavigationMenuTrigger>
				<NavigationMenuTrigger as={A} href="/dashboard">
					Dashboard
				</NavigationMenuTrigger>
			</NavigationMenu>
			<NavigationMenu>
				<NavbarUserMenu />
			</NavigationMenu>
		</div>
	)
}
