import { For } from "solid-js"
import type { NavMenu } from "./type"

export function NavMenus(props: { menus: NavMenu[] }) {
	return (
		<For each={props.menus}>
			{(menu) => (
				<menu.renderer label={menu.label} items={menu.items} class={menu.rendererClass} linkClass={menu.linkClass} />
			)}
		</For>
	)
}

export { default as UserNavbarMenu } from "./user-navbar-menu"
export { default as UserSidebarMenu } from "./user-sidebar-menu"
