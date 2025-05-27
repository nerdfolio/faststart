"use client"

import { For } from "solid-js"
import type { MenuTree } from "./menu-type"

// export function MenuAsSidebarGroup(
// 	props: {
// 		menu: NavMenu,
// 		linkClass?: string
// 	} & ComponentProps<typeof SidebarGroup>
// ) {
// 	return (
// 		<Switch fallback={<SidebarMenuPrimary {...props} />}>
// 			<Match when={props.menu.renderer === "secondary"}>
// 				<SidebarMenuSecondary {...props} />
// 			</Match>
// 			<Match when={typeof props.menu.renderer === "function"}>
// 				{typeof props.menu.renderer === "function" ? props.menu.renderer({ ...props }) : null}
// 			</Match>
// 		</Switch>
// 	)
// }

export default function MenuAsSidebarGroups(props: { menu: MenuTree; linkClass?: string }) {
	return (
		<For each={props.menu.children}>
			{(menu) => (menu.renderer ? <menu.renderer menu={menu} /> : <div>Renderer not specified</div>)}
		</For>
	)
}
