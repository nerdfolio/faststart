import type { ComponentProps, JSXElement } from "solid-js"
import type { Icon } from "../../solid/ui/icons"

export type MenuVariant = "sidebar-primary" | "sidebar-secondary" | "navbar"

type MenuItemData = {
	label: string
	href?: string
	tooltip?: string
	icon?: Icon
	isActive?: boolean
	//renderer?: (props: { menu: MenuItem }) => JSXElement
	//rendererClass?: string
	itemsLinkClass?: string
	variant?: MenuVariant
}

export type MenuItem = MenuItemData & {
	children?: MenuItem[]
}

export type MenuTree = Partial<MenuItemData> & {
	children: MenuItem[]
}

export type Menu = {
	label?: string
	renderer: (props: ComponentProps<"div"> & { items: MenuItem[], label?: string, linkClass?: string }) => JSXElement
	rendererClass?: string
	linkClass?: string
	items: MenuItem[]
}
