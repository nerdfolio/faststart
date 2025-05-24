import type { ComponentProps } from "solid-js"
import AppNavbar from "../../solidstart/app-navbar"
import AppFooter from "./app-footer"

export default function NavbarLayout(props: ComponentProps<"div">) {
	return <div>{props.children}</div>
}

NavbarLayout.Navbar = AppNavbar
NavbarLayout.ContentArea = (props: ComponentProps<"div">) => <div class="min-h-svh">{props.children}</div>
NavbarLayout.Footer = AppFooter
