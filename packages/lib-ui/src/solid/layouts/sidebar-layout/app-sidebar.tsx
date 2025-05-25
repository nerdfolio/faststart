import { type ComponentProps, For, type JSXElement, Match, Switch } from "solid-js"

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
import { SidebarPrimaryGroup } from "./sb-primary-group"
import { SidebarSecondaryGroup } from "./sb-secondary-group"

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
				<For each={props.navMenu}>
					{(menu) => (
						<Switch fallback={<div>Specify a menu renderer</div>}>
							<Match when={menu.renderer === "primary"}>
								<SidebarPrimaryGroup menu={menu} class={menu.renderClass} />
							</Match>
							<Match when={menu.renderer === "secondary"}>
								<SidebarSecondaryGroup menu={menu} class={menu.rendererClass} />
							</Match>
						</Switch>
					)}
				</For>
			</SidebarContent>

			<SidebarFooter>{props.UserMenu}</SidebarFooter>
		</Sidebar>
	)
}

//<SidebarSecondaryGroup items={secondaryMenu} class="mt-auto" />
