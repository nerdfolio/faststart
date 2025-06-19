import MenuAsNavLinks from "ui-solid/nav-menu/as-nav-links"
import AA from "ui-solid/start/aa"
import Footer from "ui-solid/ui/footer"
import SocialLinks from "ui-solid/ui/social-links"
import { copyrightStatement } from "./app-branding"

const footerLinks = [
	{ href: "/about", label: "About" },
	{ href: "/contact", label: "Contact" },
	{ href: "/terms", label: "Terms" },
	{ href: "/privacy", label: "Privacy Policy" },
]

export default function AppFooter() {
	return (
		<Footer class="border-t-1">
			<MenuAsNavLinks items={footerLinks} linkComponent={AA} linkClass="text-muted-foreground hover:brightness-130" />
			<SocialLinks
				class="flex flex-row gap-8 justify-center my-8"
				linkClass="text-muted-foreground brightness-80 hover:brightness-130"
				socialLinks={__APP_INFO__.socialLinks}
			/>
			<p class="text-sm text-center text-muted-foreground">{copyrightStatement}</p>
		</Footer>
	)
}
