import MenuAsNavLinks from "lib-ui/solid/nav-menu/as-nav-links"
import MenuAsNavbarGroup from "lib-ui/solid/nav-menu/as-nb-group"
import AppSocials from "lib-ui/solid/ui/social-links"
import AA from "lib-ui/solidstart/aa"
import type { ComponentProps } from "solid-js"
import NavbarUserMenu from "user/components/user/navbar-user-menu"
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

const socialLinks = {
	github: "https://github.com/solidjs/solid-start",
	bluesky: "https://bsky.app/profile/solidjs.com",
	x: "https://x.com/solid_js",
}

export default function NavbarLayout(props: ComponentProps<typeof NBL>) {
	return (
		<NBL>
			<NBL.Navbar AppBranding={<AppBranding href="/" />} UserMenu={<NavbarUserMenu />} menus={navMenus} />
			<NBL.ContentArea>{props.children}</NBL.ContentArea>
			<NBL.Footer class="border-t-1">
				<MenuAsNavLinks items={footerLinks} linkComponent={AA} linkClass="text-muted-foreground hover:brightness-130" />
				<AppSocials
					class="flex flex-row gap-8 justify-center my-8"
					linkClass="text-muted-foreground brightness-80 hover:brightness-130"
					socialLinks={socialLinks}
				/>
				<p class="text-sm text-center text-muted-foreground">{copyrightStatement}</p>
			</NBL.Footer>
		</NBL>
	)
}
