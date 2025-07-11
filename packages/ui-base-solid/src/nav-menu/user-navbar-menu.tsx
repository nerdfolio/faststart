import { type Accessor, Show } from "solid-js"
import { useUi } from "../context"
import { IconLogout } from "../icons"
import {
	NavigationMenu as NavMenu,
	NavigationMenuContent as NavMenuContent,
	NavigationMenuItem as NavMenuItem,
	NavigationMenuLink as NavMenuLink,
	NavigationMenuTrigger as NavMenuTrigger,
} from "../ui/navigation-menu"
import { type AvatarUser, UserAvatar } from "../ui/user-avatar"

export function UserNavbarMenu(props: {
	user: Accessor<AvatarUser | undefined>
	signInUrl: string
	signOut: () => Promise<unknown>
}) {
	const { HrefLink } = useUi()

	return (
		<NavMenu class="min-w-18 text-center">
			<Show
				when={props.user()}
				fallback={
					<NavMenuTrigger as={HrefLink} href={props.signInUrl}>
						Log in
					</NavMenuTrigger>
				}
			>
				<NavMenuItem>
					<NavMenuTrigger class="p-0 rounded-full w-fit animate-in fade-in duration-2000">
						<UserAvatar user={props.user() as AvatarUser} />
					</NavMenuTrigger>
					<NavMenuContent class="w-40 p-0">
						<NavMenuLink onClick={() => props.signOut()} class="flex flex-row justify-between">
							<span>Log out</span> <IconLogout />
						</NavMenuLink>
					</NavMenuContent>
				</NavMenuItem>
			</Show>
		</NavMenu>
	)
}
