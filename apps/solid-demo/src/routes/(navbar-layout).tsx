import { NavbarLayout } from "@nerdfolio/ui-base-solid/layouts"
import { MenuAsNavbarGroup, NavMenus, UserNavbarMenu } from "@nerdfolio/ui-base-solid/nav-menu"
import { AA } from "@nerdfolio/ui-base-solid/solidstart"
import { A } from "@solidjs/router"
import type { ComponentProps } from "solid-js"
import { useBetterAuth } from "ui-better-auth/solidstart"
import { AppBranding } from "~/components/app-branding"
import AppFooter from "~/components/app-footer"

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
	const { signOut, sessionUser } = useBetterAuth()

	return (
		<NavbarLayout>
			<NavbarLayout.Navbar
				Branding={<AppBranding href="/" />}
				UserMenu={<UserNavbarMenu signInUrl="/login" signOut={signOut} user={sessionUser} Link={A} />}
				Menus={<NavMenus menus={navMenus} />}
			/>
			<NavbarLayout.ContentArea>{props.children}</NavbarLayout.ContentArea>
			<AppFooter />
		</NavbarLayout>
	)
}
