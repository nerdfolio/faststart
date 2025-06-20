import type { Accessor, ComponentProps } from "solid-js"
import NavbarLayout from "ui-base-solid/layouts/navbar-layout"
import { NavMenus } from "ui-base-solid/nav-menu"
import MenuAsNavbarGroup from "ui-base-solid/nav-menu/as-navbar-group"
import UserNavbarMenu from "ui-base-solid/nav-menu/user-navbar-menu"
import AA from "ui-base-solid/solidstart/aa"
import type { AvatarUser } from "ui-base-solid/ui/user-avatar"
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

export default function AppNavbarLayout(props: ComponentProps<typeof NavbarLayout>) {
	const s = authClient.useSession()
	const user: Accessor<AvatarUser> = () => s().data?.user

	return (
		<NavbarLayout>
			<NavbarLayout.Navbar
				Branding={<AppBranding href="/" />}
				UserMenu={<UserNavbarMenu signInUrl="/login" signOut={authClient.signOut} user={user} />}
				Menus={<NavMenus menus={navMenus} />}
			/>
			<NavbarLayout.ContentArea>{props.children}</NavbarLayout.ContentArea>
			<AppFooter />
		</NavbarLayout>
	)
}
