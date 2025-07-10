import type { ComponentProps } from "solid-js"
import { For } from "solid-js"
import type { AdaptedLink } from "../ui/link-adapter"
import {
	SidebarGroup,
	SidebarGroupContent,
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
} from "../ui/sidebar"
import type { NavMenuItem } from "./types"

/*
Sidebar menu group with simpler items that has no subitem.
Rendered smaller to be a secondary menu, typically at the bottom of sidebar.
*/
export function MenuAsSidebarGroupSecondary(
	props: ComponentProps<typeof SidebarGroup> & {
		label?: string
		items: NavMenuItem[]
		Link: AdaptedLink
		linkClass?: string
	}
) {
	return (
		<SidebarGroup {...props} class={props.class}>
			<SidebarGroupContent>
				<SidebarMenu>
					<For each={props.items}>
						{(item) => (
							<SidebarMenuItem>
								<SidebarMenuButton as={props.Link} href={item.href ?? ""} class={props.linkClass} size="sm">
									{item.icon ? <item.icon /> : null}
									<span>{item.label}</span>
								</SidebarMenuButton>
							</SidebarMenuItem>
						)}
					</For>
				</SidebarMenu>
			</SidebarGroupContent>
		</SidebarGroup>
	)
}
