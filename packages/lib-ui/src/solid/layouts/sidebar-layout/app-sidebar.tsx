import { type ComponentProps, For, type JSXElement } from "solid-js"

import {
	Sidebar,
	SidebarContent,
	SidebarFooter,
	SidebarHeader,
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
} from "lib-ui/solid/sidebar"
import { primaryMenus, secondaryMenu } from "./sb-menu"
import { SidebarPrimaryGroup } from "./sb-primary-group"
import { SidebarSecondaryGroup } from "./sb-secondary-group"
import SidebarUserMenu from "./sb-user-menu"

export default function AppSidebar(props: ComponentProps<typeof Sidebar> & { AppBranding: JSXElement }) {
	return (
		<Sidebar variant="inset" {...props}>
			<SidebarHeader>
				<SidebarMenu>
					<SidebarMenuItem>
						<SidebarMenuButton size="lg" as={props.AppBranding} />
					</SidebarMenuItem>
				</SidebarMenu>
			</SidebarHeader>

			<SidebarContent>
				<For each={primaryMenus}>
					{(menu) => <SidebarPrimaryGroup items={menu.items} groupLabel={menu.groupLabel} />}
				</For>

				<SidebarSecondaryGroup items={secondaryMenu} class="mt-auto" />
			</SidebarContent>

			<SidebarFooter>
				<SidebarUserMenu />
			</SidebarFooter>
		</Sidebar>
	)
}
