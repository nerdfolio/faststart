import { SimpleFooter } from "@nerdfolio/ui-base-solid/layouts"
import { companySocials, companyCopyright } from "~/company-info"

const footerLinks = [
	{ href: "/about", label: "About" },
	{ href: "/contact", label: "Contact" },
	{ href: "/terms", label: "Terms" },
	{ href: "/privacy", label: "Privacy Policy" },
]

export default function AppFooter() {
	return (
		<SimpleFooter
			footerLinks={footerLinks}
			socialLinks={companySocials}
			copyrightStatement={companyCopyright}
		/>
	)
}
