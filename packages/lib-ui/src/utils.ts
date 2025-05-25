import { type ClassValue, clsx } from "clsx"
import type { JSXElement } from "solid-js"
import { twMerge } from "tailwind-merge"
import type { Icon } from "./solid/ui/icons"

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs))
}

export type NavItem = {
	title: string
	href: string
	icon?: Icon
	isActive?: boolean
}

export type NavMenu = NavItem & {
	items?: NavItem[]
}

export type NavMenuGroup = {
	groupLabel: string
	renderer?: (props: { group: NavMenuGroup }) => JSXElement
	menus: NavMenu[]
}
