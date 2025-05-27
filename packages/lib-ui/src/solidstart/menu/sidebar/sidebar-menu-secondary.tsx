import { A } from "@solidjs/router"
import type { ComponentProps } from "solid-js"
import { For } from "solid-js"

import {
	SidebarGroup,
	SidebarGroupContent,
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
} from "lib-ui/solidstart/ui/sidebar"
import { type MenuItem, cn } from "../../../utils"

/*
Sidebar menu group with simpler items that has no subitem.
Rendered smaller to be a secondary menu, typically at the bottom of sidebar.
*/
export function SidebarMenuSecondary(props: ComponentProps<typeof SidebarGroup> & { menu: MenuItem }) {
	return (
		<SidebarGroup {...props} class={cn(props.menu.rendererClass, props.class)}>
			<SidebarGroupContent>
				<SidebarMenu>
					<For each={props.menu.children}>
						{(item) => (
							<SidebarMenuItem>
								<SidebarMenuButton as={A} href={item.href ?? ""} class={props.menu.itemsLinkClass} size="sm">
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
