import { type Accessor, type ComponentProps, type JSXElement, type ParentProps, Show } from "solid-js"
import { Breadcrumbs } from "../ui/breadcrumbs"
import { Separator } from "../ui/separator"
import {
	Sidebar,
	SidebarContent,
	SidebarFooter,
	SidebarHeader,
	SidebarInset,
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
	SidebarProvider,
	SidebarTrigger,
} from "../ui/sidebar"

export function SidebarLayout(props: ParentProps) {
	return <SidebarProvider>{props.children}</SidebarProvider>
}

SidebarLayout.Sidebar = function SB(
	props: ComponentProps<typeof Sidebar> & {
		Branding: JSXElement
		UserMenu: JSXElement
		Menus: JSXElement
	}
) {
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

SidebarLayout.ContentArea = (
	props: ComponentProps<typeof SidebarInset> & {
		crumbs?: Accessor<string[]>
	}
) => {
	return (
		<SidebarInset>
			<header class="flex h-16 shrink-0 items-center gap-2">
				<div class="flex items-center gap-2 px-4">
					<SidebarTrigger class="-ml-1" />
					<Separator orientation="vertical" class="mr-2 data-[orientation=vertical]:h-4" />
					<Show when={props.crumbs}>
						<Breadcrumbs crumbs={props.crumbs!} />
					</Show>
				</div>
			</header>
			{props.children}
		</SidebarInset>
	)
}
