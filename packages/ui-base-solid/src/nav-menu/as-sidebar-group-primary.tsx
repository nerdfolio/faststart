"use client"
import { type ComponentProps, For, Show } from "solid-js"
import { IconChevronRight } from "../icons"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "../ui/collapsible"
import DefaultLink, { type LinkComponent } from "../ui/default-link"
import {
	SidebarGroup,
	SidebarGroupLabel,
	SidebarMenu,
	SidebarMenuAction,
	SidebarMenuButton,
	SidebarMenuItem,
	SidebarMenuSub,
	SidebarMenuSubButton,
	SidebarMenuSubItem,
} from "../ui/sidebar"
import type { NavMenuItem } from "./types"

export function MenuAsSidebarGroupPrimary(
	props: {
		label?: string
		items: NavMenuItem[]
		linkComponent?: LinkComponent
		linkClass?: string
	} & ComponentProps<typeof SidebarGroup>
) {
	const Link = props.linkComponent ?? DefaultLink

	return (
		<SidebarGroup {...props} class={props.class}>
			<SidebarGroupLabel>{props.label}</SidebarGroupLabel>
			<SidebarMenu>
				<For each={props.items}>
					{(item) => (
						<SidebarMenuItem>
							<Show
								when={item.children?.length}
								fallback={
									<SidebarMenuButton as={Link} href={item.href ?? ""} class={props.linkClass}>
										{item.icon ? <item.icon /> : null}
										<span>{item.label}</span>
									</SidebarMenuButton>
								}
							>
								<Collapsible defaultOpen={item.isActive}>
									<SidebarMenuButton as={CollapsibleTrigger}>
										{item.icon ? <item.icon /> : null}
										<span>{item.label}</span>
									</SidebarMenuButton>
									<SidebarMenuAction as={CollapsibleTrigger} class="data-expanded:rotate-90">
										<IconChevronRight />
										<span class="sr-only">Open submenu</span>
									</SidebarMenuAction>

									<CollapsibleContent>
										<SidebarMenuSub>
											<For each={item.children} fallback={<div>Loading submenu...</div>}>
												{(subItem) => (
													<SidebarMenuSubItem>
														<SidebarMenuSubButton as={Link} href={subItem.href ?? ""} class={item.itemsLinkClass}>
															<span>{subItem.label}</span>
														</SidebarMenuSubButton>
													</SidebarMenuSubItem>
												)}
											</For>
										</SidebarMenuSub>
									</CollapsibleContent>
								</Collapsible>
							</Show>
						</SidebarMenuItem>
					)}
				</For>
			</SidebarMenu>
		</SidebarGroup>
	)
}
