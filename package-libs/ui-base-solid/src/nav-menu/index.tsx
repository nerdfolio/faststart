import { For } from "solid-js"
import type { NavMenu } from "./types"

export function NavMenus(props: { menus: NavMenu[] }) {
	return (
		<For each={props.menus}>
			{(menu) => (
				<menu.renderer label={menu.label} items={menu.items} class={menu.rendererClass} linkClass={menu.linkClass} />
			)}
		</For>
	)
}

export { default as MenuAsNavLinks } from "./as-nav-links"
export { default as MenuAsNavbarGroup } from "./as-navbar-group"
export { default as MenuAsSidebarGroupPrimary } from "./as-sidebar-group-primary"
export { default as MenuAsSidebarGroupSecondary } from "./as-sidebar-group-secondary"
export * from "./types"
export { default as UserNavbarMenu } from "./user-navbar-menu"
export { default as UserSidebarMenu } from "./user-sidebar-menu"
