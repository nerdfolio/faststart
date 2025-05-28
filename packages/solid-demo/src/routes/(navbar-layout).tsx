import { default as NBL } from "lib-ui/solidstart/layouts/navbar-layout"
import { MenuAsNavLinks } from "lib-ui/solidstart/menu/menu-as-nav-links"
import { MenuAsNavbarGroup } from "lib-ui/solidstart/menu/menu-as-navbar-group"
import AppSocials from "lib-ui/solidstart/ui/social-links"
import type { ComponentProps } from "solid-js"
import NavbarUserMenu from "user/components/user/navbar-user-menu"
import { AppBranding, copyrightStatement } from "~/components/app-branding"

const navMenus = [
	{
		renderer: MenuAsNavbarGroup,
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
	const socialLinks = {
		github: "https://github.com/solidjs/solid-start",
		bluesky: "https://bsky.app/profile/solidjs.com",
		x: "https://x.com/solid_js",
	}

	return (
		<NBL>
			<NBL.Navbar AppBranding={<AppBranding href="/" />} UserMenu={<NavbarUserMenu />} menus={navMenus} />
			<NBL.ContentArea>{props.children}</NBL.ContentArea>
			<NBL.Footer class="border-t-1">
				<MenuAsNavLinks items={footerLinks} linkClass="text-muted-foreground hover:brightness-130" />
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
