import type { Accessor } from "solid-js"
import {
	IconBell,
	IconCreditCard,
	IconLogout,
	IconMoodCheck,
	IconSelector,
	IconSparkles,
} from "../../../baui/src/solid-ui/icons"
import { SidebarMenu, SidebarMenuButton, SidebarMenuItem } from "../../../baui/src/solid-ui/sidebar"
import type { BetterAuthClient } from "../../../baui/src/solidstart/types"
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuGroup,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "../ui/dropdown-menu"
import { type AvatarUser, UserAvatarCard } from "../ui/user-avatar"

export default function UserSidebarMenu(props: { signOut: () => Promise<void>; user: Accessor<AvatarUser> }) {
	return (
		<SidebarMenu>
			<SidebarMenuItem>
				<DropdownMenu>
					<DropdownMenuTrigger>
						<SidebarMenuButton
							size="lg"
							class="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
						>
							<UserAvatarCard user={props.user() as AvatarUser} />
							<IconSelector class="ml-auto size-4" />
						</SidebarMenuButton>
					</DropdownMenuTrigger>
					<DropdownMenuContent class="min-w-56 rounded-lg">
						<DropdownMenuLabel class="p-0 font-normal">
							<UserAvatarCard user={props.user() as AvatarUser} class="px-1 py-1.5" />
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
						<DropdownMenuItem onClick={() => props.signOut()}>
							<IconLogout />
							Log out
						</DropdownMenuItem>
					</DropdownMenuContent>
				</DropdownMenu>
			</SidebarMenuItem>
		</SidebarMenu>
	)
}
