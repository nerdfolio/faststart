import { useBetterAuth } from "@nerdfolio/solid-better-auth"
import { NavbarLayout } from "@nerdfolio/ui-base-solid/layouts"
import { MenuAsNavbarGroup, NavMenus, UserNavbarMenu } from "@nerdfolio/ui-base-solid/nav-menu"
import { createFileRoute, Outlet } from "@tanstack/solid-router"
import AppFooter from "~/components/app-footer"

export const Route = createFileRoute("/_public")({
	component: PublicLayout,
})

const navMenus = [
	{
		renderer: MenuAsNavbarGroup,
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
			userMenu={<UserNavbarMenu signInUrl="/login" signOut={signOut} user={sessionUser} />}
			menus={<NavMenus menus={navMenus} />}
			footer={<AppFooter />}
			themeSelector={true}
		>
			<Outlet />
		</NavbarLayout>
	)
}
