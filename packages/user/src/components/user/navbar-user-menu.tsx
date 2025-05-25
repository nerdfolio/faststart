import { A } from "@solidjs/router"
import { type User, useAuth, useSignOut } from "auth/solidstart/auth-client"
import { IconLogout } from "lib-ui/solidstart/ui/icons"
import {
	NavigationMenuContent,
	NavigationMenuItem,
	NavigationMenuLink,
	NavigationMenuTrigger,
} from "lib-ui/solidstart/ui/navigation-menu"
import { Show } from "solid-js"
import UserAvatar from "./user-avatar"

export default function NavbarUserMenu() {
	const signOut = useSignOut()

	return (
		<div class="min-w-18 text-center">
			<Show when={!useAuth().isPending}>
				<Show when={useAuth().user} fallback={<LoginTrigger />}>
					<NavigationMenuItem>
						<NavigationMenuTrigger class="p-0 rounded-full w-fit animate-in fade-in duration-2000">
							<UserAvatar user={useAuth().user as User} />
						</NavigationMenuTrigger>
						<NavigationMenuContent class="w-40 p-0">
							<NavigationMenuLink onClick={signOut} class="flex flex-row justify-between">
								<span>Log out</span> <IconLogout />
							</NavigationMenuLink>
						</NavigationMenuContent>
					</NavigationMenuItem>
				</Show>
			</Show>
		</div>
	)
}

function LoginTrigger() {
	return (
		<NavigationMenuTrigger as={A} href="/login">
			Log in
		</NavigationMenuTrigger>
	)
}
