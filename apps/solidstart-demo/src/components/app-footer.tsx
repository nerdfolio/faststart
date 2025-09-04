import { SimpleFooter } from "ui-solid/layouts"
import { companyCopyright, companySocialLinks } from "../company-info"

const navLinks = [
	{ href: "/about", label: "About" },
	{ href: "/contact", label: "Contact" },
	{ href: "/terms", label: "Terms" },
	{ href: "/privacy", label: "Privacy Policy" },
]

export default function AppFooter() {
	return (
		<SimpleFooter
			navLinks={navLinks}
			socialLinks={companySocialLinks}
			copyrightStatement={companyCopyright}
		/>
	)
}
