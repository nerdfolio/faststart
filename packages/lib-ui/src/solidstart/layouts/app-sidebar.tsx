import type { ComponentProps, JSXElement } from "solid-js"

import {
	Sidebar,
	SidebarContent,
	SidebarFooter,
	SidebarHeader,
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
} from "lib-ui/solidstart/ui/sidebar"
import MenuAsSidebarGroups from "../menu/menu-as-sidebar-groups"
import type { MenuTree } from "../menu/menu-type"

type AppSidebarProps = ComponentProps<typeof Sidebar> & {
	AppBranding: JSXElement
	UserMenu: JSXElement
}
export default function AppSidebar(props: AppSidebarProps & { menuTree: MenuTree }) {
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
				<MenuAsSidebarGroups menu={props.menuTree} />
			</SidebarContent>

			<SidebarFooter>{props.UserMenu}</SidebarFooter>
		</Sidebar>
	)
}
