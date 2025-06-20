import { type ComponentProps, splitProps } from "solid-js"
import { cn } from "../utils"
import { Avatar, AvatarFallback, AvatarImage } from "./avatar"

export type AvatarUser = {
	image?: string | null
	name?: string
	email?: string
}

function getAvatarFallback({ name, email }: AvatarUser) {
	return (name || email || "--").slice(0, 2)
}

function UserAvatar(props: { user: AvatarUser } & ComponentProps<typeof Avatar>) {
	const [local, rest] = splitProps(props, ["user"])
	return (
		<Avatar {...rest}>
			<AvatarImage src={local.user?.image ?? ""} alt="user avatar" />
			<AvatarFallback class="uppercase">{getAvatarFallback(local.user)}</AvatarFallback>
		</Avatar>
	)
}

function UserAvatarCard(props: { user: AvatarUser; class?: string }) {
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

export { UserAvatar, UserAvatarCard }
