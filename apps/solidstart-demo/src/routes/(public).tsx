import { NavbarLayout } from "@nerdfolio/ui-base-solid/layouts"
import { MenuAsNavbarGroup, NavMenus, UserNavbarMenu } from "@nerdfolio/ui-base-solid/nav-menu"
import { AA } from "@nerdfolio/ui-base-solid/solidstart"
import { useBetterAuth } from "@nerdfolio/ui-better-auth/solidstart"
import type { ComponentProps } from "solid-js"
import { Transition } from "solid-transition-group"
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
			{ label: "Remult Todos", href: "/todos" },
		],
	},
]

export default function PublicRoutesLayout(props: ComponentProps<typeof NavbarLayout>) {
	const { logOut, sessionUser } = useBetterAuth()

	return (
		<NavbarLayout
			branding={<AppBranding href="/" />}
			userMenu={<UserNavbarMenu signInUrl="/login" signOut={logOut} user={sessionUser} />}
			menus={<NavMenus menus={navMenus} />}
			footer={<AppFooter />}
		>
			<Transition name="fade">{props.children}</Transition>
		</NavbarLayout>
	)
}
