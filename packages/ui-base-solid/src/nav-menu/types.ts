import type { ComponentProps, JSXElement } from "solid-js"
import type { Icon } from "../icons"

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
	renderer: (
		props: ComponentProps<"div"> & { items: NavMenuItem[]; label?: string; linkClass?: string }
	) => JSXElement

	rendererClass?: string
	linkClass?: string
	items: NavMenuItem[]
}
