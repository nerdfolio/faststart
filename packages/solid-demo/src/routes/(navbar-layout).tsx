import MenuAsNavbarGroup from "lib-ui/solid/nav-menu/as-nb-group"
import NavMenus from "lib-ui/solid/nav-menu/index"
import AA from "lib-ui/solid/start/aa"
import type { ComponentProps } from "solid-js"
import NavbarUserMenu from "user/components/user/nb-user-menu"
import { AppBranding } from "~/components/app-branding"
import AppFooter from "~/components/app-footer"
import { default as NBL } from "../../../lib-ui/src/solid/start/navbar-layout"

const navMenus = [
	{
		renderer: MenuAsNavbarGroup,
		linkComponent: AA,
		items: [
			{ label: "About", href: "/about" },
			{ label: "Road map", href: "/roadmap" },
			{ label: "Dashboard", href: "/dashboard" },
		],
	},
]

export default function NavbarLayout(props: ComponentProps<typeof NBL>) {
	return (
		<NBL>
			<NBL.Navbar
				Branding={<AppBranding href="/" />}
				UserMenu={<NavbarUserMenu />}
				Menus={<NavMenus menus={navMenus} />}
			/>
			<NBL.ContentArea>{props.children}</NBL.ContentArea>
			<AppFooter />
		</NBL>
	)
}
