import { type Accessor, Show } from "solid-js"
import { IconLogout } from "../icons"
import type { LinkComponent } from "../ui/default-link"
import {
	NavigationMenu,
	NavigationMenuContent,
	NavigationMenuItem,
	NavigationMenuLink,
	NavigationMenuTrigger,
} from "../ui/navigation-menu"
import { type AvatarUser, UserAvatar } from "../ui/user-avatar"

export default function UserNavbarMenu(props: {
	user: Accessor<AvatarUser | undefined>
	signInUrl: string
	signOut: () => Promise<unknown>
	Link: LinkComponent
}) {
	const loginTrigger = (
		<NavigationMenuTrigger as={props.Link} href="/login">
			Log in
		</NavigationMenuTrigger>
	)

	return (
		<NavigationMenu class="min-w-18 text-center">
			<Show when={props.user()} fallback={loginTrigger}>
				<NavigationMenuItem>
					<NavigationMenuTrigger class="p-0 rounded-full w-fit animate-in fade-in duration-2000">
						<UserAvatar user={props.user() as AvatarUser} />
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
