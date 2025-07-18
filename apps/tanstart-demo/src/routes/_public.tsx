import { useBetterAuth } from "@nerdfolio/solid-better-auth"
import { NavbarLayout } from "@nerdfolio/ui-base-solid/layouts"
import { MenuAsNavbarGroup, NavMenus, UserNavbarMenu } from "@nerdfolio/ui-base-solid/nav-menu"
import { wrapLink } from "@nerdfolio/ui-base-solid/utils"
import { createFileRoute, Link, Outlet } from "@tanstack/solid-router"
import { AppBranding } from "~/components/app-branding"
import AppFooter from "~/components/app-footer"

export const Route = createFileRoute("/_public")({
	component: PublicLayout,
})

const LinkHref = wrapLink(Link, "to")

const navMenus = [
	{
		renderer: MenuAsNavbarGroup,
		linkComponent: LinkHref,
		items: [
			{ label: "About", href: "/about" },
			{ label: "Road map", href: "/roadmap" },
			{ label: "Dashboard", href: "/dashboard" },
			{ label: "Remult Todos", href: "/todos" },
		],
	},
]

function PublicLayout() {
	const { logout: signOut, sessionUser } = useBetterAuth()

	return (
		<NavbarLayout
			branding={<AppBranding href="/" />}
			userMenu={<UserNavbarMenu signInUrl="/login" signOut={signOut} user={sessionUser} Link={LinkHref} />}
			menus={<NavMenus menus={navMenus} />}
			footer={<AppFooter />}
		>
			<Outlet />
		</NavbarLayout>
	)
}
