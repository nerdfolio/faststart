import { UserNavbarMenu } from "baui/solidstart"
import type { ComponentProps } from "solid-js"
import MenuAsNavbarGroup from "ui-solid/nav-menu/as-nb-group"
import NavMenus from "ui-solid/nav-menu/index"
import AA from "ui-solid/start/aa"
import { default as NBL } from "ui-solid/start/navbar-layout"
import { AppBranding } from "~/components/app-branding"
import AppFooter from "~/components/app-footer"
import { authClient } from "~/lib/clients"

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
				UserMenu={<UserNavbarMenu authClient={authClient} />}
				Menus={<NavMenus menus={navMenus} />}
			/>
			<NBL.ContentArea>{props.children}</NBL.ContentArea>
			<AppFooter />
		</NBL>
	)
}
