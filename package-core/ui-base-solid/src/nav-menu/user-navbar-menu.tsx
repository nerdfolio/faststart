import { A } from "@solidjs/router"
import { type Accessor, Show } from "solid-js"
import { IconLogout } from "../../../baui/src/solid-ui/icons"
import type { BetterAuthClient } from "../../../baui/src/solidstart/types"
import {
	NavigationMenu,
	NavigationMenuContent,
	NavigationMenuItem,
	NavigationMenuLink,
	NavigationMenuTrigger,
} from "../ui/navigation-menu"
import { type AvatarUser, UserAvatar } from "../ui/user-avatar"

export default function UserNavbarMenu(props: {
	user: Accessor<AvatarUser>
	signInUrl: string
	signOut: () => Promise<void>
}) {
	return (
		<NavigationMenu class="min-w-18 text-center">
			<Show when={props.user()} fallback={<NavTrigger href={props.signInUrl} title="Log in" />}>
				<NavigationMenuItem>
					<NavigationMenuTrigger class="p-0 rounded-full w-fit animate-in fade-in duration-2000">
						<UserAvatar user={s().data?.user as AvatarUser} />
					</NavigationMenuTrigger>
					<NavigationMenuContent class="w-40 p-0">
						<NavigationMenuLink onClick={() => props.signOut()} class="flex flex-row justify-between">
							<span>Log out</span> <IconLogout />
						</NavigationMenuLink>
					</NavigationMenuContent>
				</NavigationMenuItem>
			</Show>
		</NavigationMenu>
	)
}

function NavTrigger(props: { href: string; title: string }) {
	return (
		<NavigationMenuTrigger as={A} href={props.href}>
			{props.title}
		</NavigationMenuTrigger>
	)
}
