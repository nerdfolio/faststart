import AuthRequired from "auth/solidstart/components/auth-required"
import SidebarLayout from "lib-ui/solidstart/layouts/sidebar-layout"
import { SidebarMenuPrimary } from "lib-ui/solidstart/menu/sidebar/sidebar-menu-primary"
import { SidebarMenuSecondary } from "lib-ui/solidstart/menu/sidebar/sidebar-menu-secondary"
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
import type { MenuTree } from "../../../lib-ui/src/solidstart/menu/menu-type"

const pagesMenu: MenuTree = {
	label: "Pages",
	renderer: SidebarMenuPrimary,
	children: [
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

const guidesMenu: MenuTree = {
	label: "Guides",
	renderer: SidebarMenuPrimary,
	children: [
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

const secondaryMenu: MenuTree = {
	renderer: SidebarMenuSecondary,
	rendererClass: "mt-auto",
	children: [
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
	const menuTree = {
		children: [pagesMenu, guidesMenu, secondaryMenu],
	}

	return (
		<AuthRequired>
			<SidebarLayout>
				<SidebarLayout.Sidebar AppBranding={<AppBranding />} UserMenu={<SidebarUserMenu />} menuTree={menuTree} />
				<SidebarLayout.ContentArea>{props.children}</SidebarLayout.ContentArea>
			</SidebarLayout>
		</AuthRequired>
	)
}
