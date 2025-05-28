import MenuAsNavLinks from "lib-ui/solid/nav-menu/as-nav-links"
import MenuAsNavbarGroup from "lib-ui/solid/nav-menu/as-nb-group"
import NavMenus from "lib-ui/solid/nav-menu/index"
import SocialLinks from "lib-ui/solid/ui/social-links"
import AA from "lib-ui/solidstart/aa"
import type { ComponentProps } from "solid-js"
import NbUserMenu from "user/components/user/nb-user-menu"
import { AppBranding, copyrightStatement } from "~/components/app-branding"
import { default as NBL } from "../../../lib-ui/src/solid/layouts/navbar-layout"

const navMenus = [
	{
		renderer: MenuAsNavbarGroup,
		linkComponent: AA,
		items: [
			{ label: "About", href: "/about" },
			{ label: "Road map", href: "/roadmap" },
			{ label: "Dashboard", href: "/dashboard" },
		],
	},
]

const footerLinks = [
	{ href: "/about", label: "About" },
	{ href: "/contact", label: "Contact" },
	{ href: "/terms", label: "Terms" },
	{ href: "/privacy", label: "Privacy Policy" },
]

export default function NavbarLayout(props: ComponentProps<typeof NBL>) {
	return (
		<NBL>
			<NBL.Navbar Branding={<AppBranding href="/" />} UserMenu={<NbUserMenu />} Menus={<NavMenus menus={navMenus} />} />
			<NBL.ContentArea>{props.children}</NBL.ContentArea>
			<NBL.Footer class="border-t-1">
				<MenuAsNavLinks items={footerLinks} linkComponent={AA} linkClass="text-muted-foreground hover:brightness-130" />
				<SocialLinks
					class="flex flex-row gap-8 justify-center my-8"
					linkClass="text-muted-foreground brightness-80 hover:brightness-130"
					socialLinks={__APP_INFO__.socialLinks}
				/>
				<p class="text-sm text-center text-muted-foreground">{copyrightStatement}</p>
			</NBL.Footer>
		</NBL>
	)
}
