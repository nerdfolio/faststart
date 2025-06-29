import { NavbarLayout } from "@nerdfolio/ui-base-solid/layouts"
import { MenuAsNavbarGroup, NavMenus, UserNavbarMenu } from "@nerdfolio/ui-base-solid/nav-menu"
import { AA } from "@nerdfolio/ui-base-solid/solidstart"
import { A } from "@solidjs/router"
import type { ComponentProps } from "solid-js"
import { AppBranding } from "~/components/app-branding"
import AppFooter from "~/components/app-footer"
import { authUser, signOutWithRemult } from "~/lib/clients"

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

export default function AppNavbarLayout(props: ComponentProps<typeof NavbarLayout>) {
	return (
		<NavbarLayout>
			<NavbarLayout.Navbar
				Branding={<AppBranding href="/" />}
				UserMenu={<UserNavbarMenu signInUrl="/login" signOut={signOutWithRemult} user={authUser} Link={A} />}
				Menus={<NavMenus menus={navMenus} />}
			/>
			<NavbarLayout.ContentArea>{props.children}</NavbarLayout.ContentArea>
			<AppFooter />
		</NavbarLayout>
	)
}
