import type { User } from "better-auth"
import { type ComponentProps, splitProps } from "solid-js"
import { Avatar, AvatarFallback, AvatarImage } from "./avatar"
import { cn } from "./utils"

function getAvatarFallback(user: User) {
	return (user.name || user.email).slice(0, 2)
}

function UserAvatar(props: { user: User } & ComponentProps<typeof Avatar>) {
	const [local, rest] = splitProps(props, ["user"])
	return (
		<Avatar {...rest}>
			<AvatarImage src={local.user?.image ?? ""} alt="user avatar" />
			<AvatarFallback class="uppercase">{getAvatarFallback(local.user)}</AvatarFallback>
		</Avatar>
	)
}

function UserMinicard(props: { user: User; class?: string }) {
	return (
		<div class={cn("flex items-center gap-2", props.class)}>
			<UserAvatar user={props.user} class="size-8 rounded-lg" />
			<div class="grid flex-1 text-left text-sm leading-tight">
				<span class="truncate font-semibold">{props.user.name}</span>
				<span class="truncate text-xs">{props.user.email}</span>
			</div>
		</div>
	)
}

export { UserAvatar, UserMinicard }
