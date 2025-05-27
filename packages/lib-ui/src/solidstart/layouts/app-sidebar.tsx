import { type ComponentProps, For, type JSXElement } from "solid-js"

import {
	Sidebar,
	SidebarContent,
	SidebarFooter,
	SidebarHeader,
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
} from "lib-ui/solidstart/ui/sidebar"
import type { MenuTree } from "../../utils"

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
				<For each={props.menuTree.children}>
					{(menu) => (menu.renderer ? <menu.renderer menu={menu} /> : <div>Renderer not specified</div>)}
				</For>
			</SidebarContent>

			<SidebarFooter>{props.UserMenu}</SidebarFooter>
		</Sidebar>
	)
}
