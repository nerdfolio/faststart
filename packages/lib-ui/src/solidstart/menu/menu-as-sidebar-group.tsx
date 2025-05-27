"use client"
import { SidebarMenuPrimary } from "./sidebar/sidebar-menu-primary"
import { SidebarMenuSecondary } from "./sidebar/sidebar-menu-secondary"

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

export { SidebarMenuPrimary, SidebarMenuSecondary }
