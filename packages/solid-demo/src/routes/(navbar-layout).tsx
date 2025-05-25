import NavLinks from "lib-ui/solid/blocks/nav-links"
import { default as NBL } from "lib-ui/solid/blocks/navbar-layout"
import AppSocials from "lib-ui/solid/blocks/social-links"
import type { ComponentProps } from "solid-js"
import NavbarUserMenu from "user/components/user/navbar-user-menu"
import { AppBranding, copyrightStatement } from "~/components/app-branding"

export default function NavbarLayout(props: ComponentProps<typeof NBL>) {
	const navLinks = [
		{ href: "/about", title: "About" },
		{ href: "/contact", title: "Contact" },
		{ href: "/terms", title: "Terms" },
		{ href: "/privacy", title: "Privacy Policy" },
	]

	const socialLinks = {
		github: "https://github.com/solidjs/solid-start",
		bluesky: "https://bsky.app/profile/solidjs.com",
		x: "https://x.com/solid_js",
	}

	return (
		<NBL>
			<NBL.Navbar AppBranding={<AppBranding href="/" />} UserMenu={<NavbarUserMenu />} />
			<NBL.ContentArea>{props.children}</NBL.ContentArea>
			<NBL.Footer class="border-t-1">
				<NavLinks links={navLinks} linkClass="text-muted-foreground hover:brightness-130" />
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
