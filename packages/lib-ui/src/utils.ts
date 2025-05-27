import { type ClassValue, clsx } from "clsx"
import type { JSXElement } from "solid-js"
import { twMerge } from "tailwind-merge"
import type { Icon } from "./solid/ui/icons"

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs))
}

// export type NavMenuItem = {
// 	title: string
// 	href: string
// 	tooltip?: string
// 	icon?: Icon
// 	isActive?: boolean
// 	items?: NavMenuItem[]
// 	itemsLinkClass?: string
// }

// export type NavMenu = {
// 	label?: string
// 	renderer?: (props: { menu: NavMenu }) => JSXElement
// 	rendererClass?: string
// 	itemsLinkClass?: string //css class for use at the next level down
// 	items: NavMenuItem[]
// }

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

export type MenuTree = {
	children: MenuItem[]
}
