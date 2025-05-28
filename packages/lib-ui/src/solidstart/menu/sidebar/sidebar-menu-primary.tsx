"use client"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "lib-ui/solidstart/ui/collapsible"
import { IconChevronRight } from "lib-ui/solidstart/ui/icons"
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
} from "lib-ui/solidstart/ui/sidebar"
import SmartLink from "lib-ui/solidstart/ui/smart-link"
import { type ComponentProps, For, Show } from "solid-js"
import type { MenuItem } from "../menu-type"

export function SidebarMenuPrimary(
	props: {
		label?: string
		items: MenuItem[]
		linkClass?: string
	} & ComponentProps<typeof SidebarGroup>
) {
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
									<SidebarMenuButton as={SmartLink} href={item.href ?? ""} class={props.linkClass}>
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
														<SidebarMenuSubButton
															as={SmartLink}
															href={subItem.href ?? ""}
															class={item.itemsLinkClass}
															markExternalLink
														>
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
