import { useBetterAuth } from "@nerdfolio/solid-better-auth"
import { NavbarLayout } from "ui-solid/layouts"
import { MenuAsNavbarGroup, NavMenus, UserNavbarMenu } from "ui-solid/nav-menu"

import { createFileRoute, Outlet } from "@tanstack/solid-router"
import AppFooter from "~/components/app-footer"

export const Route = createFileRoute("/_public")({
	component: PublicLayout,
})

const menus = [
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
			navMenus={<NavMenus menus={menus} />}
			footer={<AppFooter />}
			themeSelector={true}
		>
			<main class="p-4">
				<Outlet />
			</main>
		</NavbarLayout>
	)
}
