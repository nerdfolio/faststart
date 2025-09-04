import { useBetterAuth } from "@nerdfolio/solid-better-auth"
import { NavbarLayout } from "ui-solid/layouts"
import { MenuAsNavbarGroup, NavMenus, UserNavbarMenu } from "ui-solid/nav-menu"
import { AA } from "ui-solid/solidstart"

import type { ComponentProps } from "solid-js"
import { Transition } from "solid-transition-group"
import AppFooter from "~/components/app-footer"

const menus = [
	{
		renderer: MenuAsNavbarGroup,
		linkComponent: AA,
		items: [
			{ label: "About", href: "/about" },
			{ label: "Road map", href: "/roadmap" },
			{ label: "Dashboard", href: "/dashboard" },
			{ label: "Remult Todos", href: "/todos" },
		],
	},
]

export default function PublicRoutesLayout(props: ComponentProps<typeof NavbarLayout>) {
	const { logout, sessionUser } = useBetterAuth()

	return (
		<NavbarLayout
			userMenu={<UserNavbarMenu signInUrl="/login" signOut={logout} user={sessionUser} />}
			navMenus={<NavMenus menus={menus} />}
			footer={<AppFooter />}
		>
			<Transition name="fade">{props.children}</Transition>
		</NavbarLayout>
	)
}
