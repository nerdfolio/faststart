import type { JSXElement } from "solid-js"
import type { Icon } from "../../solid/ui/icons"

type MenuItemData = {
	label: string
	href?: string
	tooltip?: string
	icon?: Icon
	isActive?: boolean
	renderer?: (props: { menu: MenuItem }) => JSXElement
	rendererClass?: string

	itemsLinkClass?: string
}

export type MenuItem = MenuItemData & {
	children?: MenuItem[]
}

export type MenuTree = Partial<MenuItemData> & {
	children: MenuItem[]
}
