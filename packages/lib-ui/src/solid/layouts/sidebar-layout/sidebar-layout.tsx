import type { ParentProps } from "solid-js"
import type { ComponentProps } from "solid-js"
import { Separator } from "lib-ui/solid/separator"
import { SidebarInset, SidebarProvider, SidebarTrigger } from "lib-ui/solid/sidebar"
import AppSidebar from "./app-sidebar"

export default function SidebarLayout(props: ParentProps) {
	return <SidebarProvider>{props.children}</SidebarProvider>
}

SidebarLayout.Sidebar = AppSidebar
SidebarLayout.ContentArea = (props: ComponentProps<typeof SidebarInset>) => (
	<SidebarInset>
		<header class="flex h-16 shrink-0 items-center gap-2">
			<div class="flex items-center gap-2 px-4">
				<SidebarTrigger class="-ml-1" />
				<Separator orientation="vertical" class="mr-2 data-[orientation=vertical]:h-4" />
			</div>
		</header>
		{props.children}
	</SidebarInset>
)
