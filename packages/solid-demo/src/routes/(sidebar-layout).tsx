import AuthRequired from "auth/solidstart/components/auth-required"
import {
	IconBook,
	IconDashboard,
	IconHome,
	IconListCheck,
	IconMathXPlusY,
	IconRocket,
	IconSparkes,
} from "lib-ui/solid/icons"
import MenuAsSidebarGroupPrimary from "lib-ui/solid/nav-menu/as-sb-group-primary"
import MenuAsSidebarGroupSecondary from "lib-ui/solid/nav-menu/as-sb-group-secondary"
import NavMenus from "lib-ui/solid/nav-menu/index"
import AA from "lib-ui/solid/start/aa"
import type { ParentProps } from "solid-js"
import SidebarUserMenu from "user/components/user/sb-user-menu"
import { AppBranding } from "~/components/app-branding"
import SidebarLayout from "../../../lib-ui/src/solid/layouts/sidebar-layout"
import type { NavMenu } from "../../../lib-ui/src/solid/nav-menu/type"

const pagesMenu: NavMenu = {
	renderer: MenuAsSidebarGroupPrimary,
	linkComponent: AA,
	label: "Pages",
	items: [
		{
			label: "Dashboard",
			href: "/dashboard",
			icon: IconDashboard,
		},
		{
			label: "Counter",
			href: "/counter",
			icon: IconMathXPlusY,
		},
	],
}

const guidesMenu: NavMenu = {
	renderer: MenuAsSidebarGroupPrimary,
	linkComponent: AA,
	label: "Guides",
	items: [
		{
			label: "SolidJS",
			href: "#",
			icon: IconSparkes,
			children: [
				{ label: "Getting started", href: "https://www.solidjs.com/guides/getting-started" },
				{ label: "Tutorial", href: "https://www.solidjs.com/tutorial/introduction_basics" },
				{ label: "Examples", href: "https://www.solidjs.com/examples" },
			],
		},
		{
			label: "Solid Start",
			href: "#",
			icon: IconRocket,
			children: [
				{ label: "Getting started", href: "https://docs.solidjs.com/solid-start/getting-started" },
				{ label: "Solid Router", href: "https://docs.solidjs.com/solid-router" },
			],
		},
	],
}

const secondaryMenu: NavMenu = {
	renderer: MenuAsSidebarGroupSecondary,
	linkComponent: AA,
	rendererClass: "mt-auto",
	items: [
		{
			label: "Home",
			href: "/",
			icon: IconHome,
		},
		{
			label: "About",
			href: "/about",
			icon: IconBook,
		},
		{
			label: "Road map",
			href: "/roadmap",
			icon: IconListCheck,
		},
	],
}

export default function ProtectedSidebarLayout(props: ParentProps) {
	const menus = [pagesMenu, guidesMenu, secondaryMenu]

	return (
		<AuthRequired>
			<SidebarLayout>
				<SidebarLayout.Sidebar
					Branding={<AppBranding />}
					UserMenu={<SidebarUserMenu />}
					Menus={<NavMenus menus={menus} />}
				/>
				<SidebarLayout.ContentArea>{props.children}</SidebarLayout.ContentArea>
			</SidebarLayout>
		</AuthRequired>
	)
}
