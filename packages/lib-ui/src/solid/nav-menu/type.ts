import type { ComponentProps, JSXElement } from "solid-js"
import type { Icon } from "../ui/icons"
import type { LinkComponent } from "./default-link-component"

type NavMenuItemData = {
	label: string
	href?: string
	tooltip?: string
	icon?: Icon
	isActive?: boolean
	itemsLinkClass?: string
}

export type NavMenuItem = NavMenuItemData & {
	children?: NavMenuItem[]
}

export type NavMenu = {
	label?: string
	renderer: (props: ComponentProps<"div"> & { items: NavMenuItem[]; label?: string; linkClass?: string }) => JSXElement
	rendererVariant?: "primary" | "secondary"
	rendererClass?: string
	linkComponent?: LinkComponent
	linkClass?: string
	items: NavMenuItem[]
}
