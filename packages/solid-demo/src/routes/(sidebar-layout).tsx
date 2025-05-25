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
import { SidebarLayout } from "lib-ui/solid/layouts"
import type { NavMenu } from "lib-ui/utils"
import type { ParentProps } from "solid-js"
import SidebarUserMenu from "user/components/user/sb-user-menu"
import { AppBranding } from "~/components/app-branding"

const pagesMenu: NavMenu = {
	label: "Pages",
	renderer: "primary",
	items: [
		{
			title: "Dashboard",
			href: "/dashboard",
			icon: IconDashboard,
		},
		{
			title: "Counter",
			href: "/counter",
			icon: IconMathXPlusY,
		},
	],
}

const guidesMenu: NavMenu = {
	label: "Guides",
	renderer: "primary",
	items: [
		{
			title: "SolidJS",
			href: "#",
			icon: IconSparkes,
			subItems: [
				{ title: "Getting started", href: "https://www.solidjs.com/guides/getting-started" },
				{ title: "Tutorial", href: "https://www.solidjs.com/tutorial/introduction_basics" },
				{ title: "Examples", href: "https://www.solidjs.com/examples" },
			],
		},
		{
			title: "Solid Start",
			href: "#",
			icon: IconRocket,
			subItems: [
				{ title: "Getting started", href: "https://docs.solidjs.com/solid-start/getting-started" },
				{ title: "Solid Router", href: "https://docs.solidjs.com/solid-router" },
			],
		},
	],
}

const secondaryMenu: NavMenu = {
	renderer: "secondary",
	rendererClass: "mt-auto",
	items: [
		{
			title: "Home",
			href: "/",
			icon: IconHome,
		},
		{
			title: "About",
			href: "/about",
			icon: IconBook,
		},
		{
			title: "Road map",
			href: "/roadmap",
			icon: IconListCheck,
		},
	],
}

export default function ProtectedSidebarLayout(props: ParentProps) {
	const navMenu: NavMenu[] = [pagesMenu, guidesMenu, secondaryMenu]

	return (
		<AuthRequired>
			<SidebarLayout>
				<SidebarLayout.Sidebar AppBranding={<AppBranding />} UserMenu={<SidebarUserMenu />} navMenu={navMenu} />
				<SidebarLayout.ContentArea>{props.children}</SidebarLayout.ContentArea>
			</SidebarLayout>
		</AuthRequired>
	)
}
