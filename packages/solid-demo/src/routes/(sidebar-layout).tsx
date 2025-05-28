import AuthRequired from "auth/solidstart/components/auth-required"
import SidebarLayout from "lib-ui/solidstart/layouts/sidebar-layout"
import { MenuAsSidebarGroupPrimary } from "lib-ui/solidstart/menu/as-sb-group-primary"
import { MenuAsSidebarGroupSecondary } from "lib-ui/solidstart/menu/as-sb-group-secondary"
import {
	IconBook,
	IconDashboard,
	IconHome,
	IconListCheck,
	IconMathXPlusY,
	IconRocket,
	IconSparkes,
} from "lib-ui/solidstart/ui/icons"
import type { ParentProps } from "solid-js"
import SidebarUserMenu from "user/components/user/sb-user-menu"
import { AppBranding } from "~/components/app-branding"
import type { Menu } from "../../../lib-ui/src/solidstart/menu/menu-type"

const pagesMenu: Menu = {
	renderer: MenuAsSidebarGroupPrimary,
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

const guidesMenu: Menu = {
	renderer: MenuAsSidebarGroupPrimary,
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

const secondaryMenu: Menu = {
	renderer: MenuAsSidebarGroupSecondary,
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
				<SidebarLayout.Sidebar AppBranding={<AppBranding />} UserMenu={<SidebarUserMenu />} menus={menus} />
				<SidebarLayout.ContentArea>{props.children}</SidebarLayout.ContentArea>
			</SidebarLayout>
		</AuthRequired>
	)
}
