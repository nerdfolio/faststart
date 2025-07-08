import { NavbarLayout } from "@nerdfolio/ui-base-solid/layouts"
import { MenuAsNavbarGroup, NavMenus, UserNavbarMenu } from "@nerdfolio/ui-base-solid/nav-menu"
import type { LinkComponent } from "@nerdfolio/ui-base-solid/ui"
import { useBetterAuth } from "@nerdfolio/ui-better-auth/solidstart"
import { createFileRoute, Link, Outlet } from "@tanstack/solid-router"
import { AppBranding } from "~/components/app-branding"
import AppFooter from "~/components/app-footer"

export const Route = createFileRoute("/_public")({
	component: PublicLayout,
})

const LinkWrap: LinkComponent = (props) => <Link to={props.href} />

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
	const { signOut, sessionUser } = useBetterAuth()

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

/*

export default function PublicRoutesLayout(props: ComponentProps<typeof NavbarLayout>) {
	const { signOut, sessionUser } = useBetterAuth()

	return (
		<NavbarLayout
			branding={<AppBranding href="/" />}
			userMenu={<UserNavbarMenu signInUrl="/login" signOut={signOut} user={sessionUser} Link={A} />}
			menus={<NavMenus menus={navMenus} />}
			footer={<AppFooter />}
		>
			<Transition name="fade">{props.children}</Transition>
		</NavbarLayout>
	)
}

*/
