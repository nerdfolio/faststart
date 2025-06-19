import { A } from "@solidjs/router"
import type { User } from "better-auth"
import { Show } from "solid-js"
import { IconLogout } from "../solid-ui/icons"
import {
	NavigationMenu,
	NavigationMenuContent,
	NavigationMenuItem,
	NavigationMenuLink,
	NavigationMenuTrigger,
} from "../solid-ui/navigation-menu"
import UserAvatar from "../solid-ui/user-avatar"
import type { BetterAuthClient } from "./types"

export default function UserNavbarMenu(props: { authClient: BetterAuthClient }) {
	// const signOut = useSignOut()

	const s = props.authClient.useSession()

	return (
		<NavigationMenu class="min-w-18 text-center">
			<Show when={s().data}>
				<Show when={s().data?.user} fallback={<LoginTrigger />}>
					<NavigationMenuItem>
						<NavigationMenuTrigger class="p-0 rounded-full w-fit animate-in fade-in duration-2000">
							<UserAvatar user={s().data?.user as User} />
						</NavigationMenuTrigger>
						<NavigationMenuContent class="w-40 p-0">
							<NavigationMenuLink onClick={() => props.authClient.signOut()} class="flex flex-row justify-between">
								<span>Log out</span> <IconLogout />
							</NavigationMenuLink>
						</NavigationMenuContent>
					</NavigationMenuItem>
				</Show>
			</Show>
		</NavigationMenu>
	)
}

function LoginTrigger() {
	return (
		<NavigationMenuTrigger as={A} href="/login">
			Log in
		</NavigationMenuTrigger>
	)
}
