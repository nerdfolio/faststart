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
import type { NavMenu } from "../../../utils"
import { SidebarMenuRenderer } from "../../blocks/sidebar-menu-renderer"

type AppSidebarProps = ComponentProps<typeof Sidebar> & {
	AppBranding: JSXElement
	UserMenu: JSXElement
}
export default function AppSidebar(props: AppSidebarProps & { navMenu: NavMenu[] }) {
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
				<For each={props.navMenu}>{(menu) => <SidebarMenuRenderer menu={menu} />}</For>
			</SidebarContent>

			<SidebarFooter>{props.UserMenu}</SidebarFooter>
		</Sidebar>
	)
}
