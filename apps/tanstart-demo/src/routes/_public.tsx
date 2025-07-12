import { useBetterAuth } from "@nerdfolio/solid-better-auth"
import { NavbarLayout } from "@nerdfolio/ui-base-solid/layouts"
import { MenuAsNavbarGroup, NavMenus, UserNavbarMenu } from "@nerdfolio/ui-base-solid/nav-menu"
import { createFileRoute, Outlet } from "@tanstack/solid-router"
import { AppBranding } from "~/components/app-branding"
import AppFooter from "~/components/app-footer"
import { LinkWrap } from "~/components/link-wrap"

export const Route = createFileRoute("/_public")({
	component: PublicLayout,
})

const navMenus = [
	{
		renderer: MenuAsNavbarGroup,
		linkComponent: LinkWrap,
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
			userMenu={<UserNavbarMenu signInUrl="/login" signOut={signOut} user={sessionUser} Link={LinkWrap} />}
			menus={<NavMenus menus={navMenus} />}
			footer={<AppFooter />}
		>
			<Outlet />
		</NavbarLayout>
	)
}
