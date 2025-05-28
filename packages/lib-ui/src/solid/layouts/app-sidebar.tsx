import type { ComponentProps, JSXElement } from "solid-js"

import {
	Sidebar,
	SidebarContent,
	SidebarFooter,
	SidebarHeader,
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
} from "lib-ui/solid/ui/sidebar"

type AppSidebarProps = ComponentProps<typeof Sidebar> & {
	Branding: JSXElement
	UserMenu: JSXElement
	Menus: JSXElement
}
export default function AppSidebar(props: AppSidebarProps) {
	return (
		<Sidebar variant="inset" {...props}>
			<SidebarHeader>
				<SidebarMenu>
					<SidebarMenuItem>
						<SidebarMenuButton size="lg" as={props.Branding} />
					</SidebarMenuItem>
				</SidebarMenu>
			</SidebarHeader>

			<SidebarContent>{props.Menus}</SidebarContent>
			<SidebarFooter>{props.UserMenu}</SidebarFooter>
		</Sidebar>
	)
}
