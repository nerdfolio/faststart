import { type ClassValue, clsx } from "clsx"
import type { JSXElement } from "solid-js"
import { twMerge } from "tailwind-merge"
import type { Icon } from "./solid/ui/icons"

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs))
}


export type NavMenuItem = {
	title: string
	href: string
	tooltip?: string
	icon?: Icon
	isActive?: boolean
	subItems?: NavMenuItem[]
}

export type NavMenu = {
	label?: string
	renderer?: "primary" | "secondary" | ((props: { menu: NavMenu }) => JSXElement)
	rendererClass?: string
	items: NavMenuItem[]
}
