import type { ComponentProps, JSXElement } from "solid-js"
import type { Icon } from "../../solid/ui/icons"

type MenuItemData = {
	label: string
	href?: string
	tooltip?: string
	icon?: Icon
	isActive?: boolean
	itemsLinkClass?: string
}

export type MenuItem = MenuItemData & {
	children?: MenuItem[]
}

export type Menu = {
	label?: string
	renderer: (props: ComponentProps<"div"> & { items: MenuItem[], label?: string, linkClass?: string }) => JSXElement
	rendererVariant?: "primary" | "secondary"
	rendererClass?: string
	linkClass?: string
	items: MenuItem[]
}
