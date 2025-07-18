import { SimpleFooter } from "@nerdfolio/ui-base-solid/layouts"
import { wrapLink } from "@nerdfolio/ui-base-solid/utils"
import { Link } from "@tanstack/solid-router"
import { appCopyright, appSocialLinks } from "~/app-info"

const footerLinks = [
	{ href: "/about", label: "About" },
	{ href: "/contact", label: "Contact" },
	{ href: "/terms", label: "Terms" },
	{ href: "/privacy", label: "Privacy Policy" },
]

export default function AppFooter() {
	return (
		<SimpleFooter
			Link={wrapLink(Link, "to")}
			footerLinks={footerLinks}
			socialLinks={appSocialLinks}
			copyrightStatement={appCopyright}
		/>
	)
}
