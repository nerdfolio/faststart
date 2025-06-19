import type { ComponentProps } from "solid-js"
import { For } from "solid-js"

import { SidebarGroup, SidebarGroupContent, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from "../ui/sidebar"
import DefaultLinkComponent, { type LinkComponent } from "./default-link-component"
import type { NavMenuItem } from "./type"

/*
Sidebar menu group with simpler items that has no subitem.
Rendered smaller to be a secondary menu, typically at the bottom of sidebar.
*/
export default function MenuAsSidebarGroupSecondary(
	props: ComponentProps<typeof SidebarGroup> & {
		label?: string
		items: NavMenuItem[]
		linkComponent?: LinkComponent
		linkClass?: string
	}
) {
	const Link = props.linkComponent ?? DefaultLinkComponent

	return (
		<SidebarGroup {...props} class={props.class}>
			<SidebarGroupContent>
				<SidebarMenu>
					<For each={props.items}>
						{(item) => (
							<SidebarMenuItem>
								<SidebarMenuButton as={Link} href={item.href ?? ""} class={props.linkClass} size="sm">
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
