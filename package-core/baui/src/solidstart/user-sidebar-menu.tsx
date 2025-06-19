import type { User } from "better-auth"
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuGroup,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "../solid-ui/dropdown-menu"
import { IconBell, IconCreditCard, IconLogout, IconMoodCheck, IconSelector, IconSparkles } from "../solid-ui/icons"
import { SidebarMenu, SidebarMenuButton, SidebarMenuItem } from "../solid-ui/sidebar"
import UserMinicard from "../solid-ui/user-minicard"
import type { BetterAuthClient } from "./types"

export default function UserSidebarMenu(props: { authClient: BetterAuthClient }) {
	//const signOut = useSignOut()

	const s = props.authClient.useSession()

	return (
		<SidebarMenu>
			<SidebarMenuItem>
				<DropdownMenu>
					<DropdownMenuTrigger>
						<SidebarMenuButton
							size="lg"
							class="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
						>
							<UserMinicard user={s().data?.user as User} />
							<IconSelector class="ml-auto size-4" />
						</SidebarMenuButton>
					</DropdownMenuTrigger>
					<DropdownMenuContent class="min-w-56 rounded-lg">
						<DropdownMenuLabel class="p-0 font-normal">
							<UserMinicard user={s().data?.user as User} class="px-1 py-1.5" />
						</DropdownMenuLabel>
						<DropdownMenuSeparator />
						<DropdownMenuGroup>
							<DropdownMenuItem>
								<IconSparkles />
								Upgrade to Pro
							</DropdownMenuItem>
						</DropdownMenuGroup>
						<DropdownMenuSeparator />
						<DropdownMenuGroup>
							<DropdownMenuItem>
								<IconMoodCheck />
								Account
							</DropdownMenuItem>
							<DropdownMenuItem>
								<IconCreditCard />
								Billing
							</DropdownMenuItem>
							<DropdownMenuItem>
								<IconBell />
								Notifications
							</DropdownMenuItem>
						</DropdownMenuGroup>
						<DropdownMenuSeparator />
						<DropdownMenuItem onClick={() => props.authClient.signOut()}>
							<IconLogout />
							Log out
						</DropdownMenuItem>
					</DropdownMenuContent>
				</DropdownMenu>
			</SidebarMenuItem>
		</SidebarMenu>
	)
}
