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
import { type NavMenu, cn } from "../../../utils"

export function SidebarMenuPrimary(
	props: {
		menu: NavMenu
		linkClass?: string
	} & ComponentProps<typeof SidebarGroup>
) {
	return (
		<SidebarGroup {...props} class={cn(props.menu.rendererClass, props.class)}>
			<SidebarGroupLabel>{props.menu.label}</SidebarGroupLabel>
			<SidebarMenu>
				<For each={props.menu.items}>
					{(item) => (
						<SidebarMenuItem>
							<Show
								when={item.subItems?.length}
								fallback={
									<SidebarMenuButton as={SmartLink} href={item.href} class={props.linkClass}>
										{item.icon ? <item.icon /> : null}
										<span>{item.title}</span>
									</SidebarMenuButton>
								}
							>
								<Collapsible defaultOpen={item.isActive}>
									<SidebarMenuButton as={CollapsibleTrigger}>
										{item.icon ? <item.icon /> : null}
										<span>{item.title}</span>
									</SidebarMenuButton>
									<SidebarMenuAction as={CollapsibleTrigger} class="data-expanded:rotate-90">
										<IconChevronRight />
										<span class="sr-only">Open submenu</span>
									</SidebarMenuAction>

									<CollapsibleContent>
										<SidebarMenuSub>
											<For each={item.subItems} fallback={<div>Loading submenu...</div>}>
												{(subItem) => (
													<SidebarMenuSubItem>
														<SidebarMenuSubButton as={SmartLink} href={subItem.href} markExternalLink>
															<span>{subItem.title}</span>
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
