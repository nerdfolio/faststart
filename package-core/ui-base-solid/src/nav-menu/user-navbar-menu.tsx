import { type Accessor, Show } from "solid-js"
import { IconLogout } from "../icons"
import {
	NavigationMenu,
	NavigationMenuContent,
	NavigationMenuItem,
	NavigationMenuLink,
	NavigationMenuTrigger,
} from "../ui/navigation-menu"
import { type AvatarUser, UserAvatar } from "../ui/user-avatar"
import type { LinkComponent } from "./default-link-component"
import DefaultLinkComponent from "./default-link-component"

export default function UserNavbarMenu(props: {
	user: Accessor<AvatarUser>
	signInUrl: string
	signOut: () => Promise<void>
	Link: LinkComponent
}) {
	const Link = props.Link ?? DefaultLinkComponent
	const loginTrigger = (
		<NavigationMenuTrigger as={Link} href="/login">
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
