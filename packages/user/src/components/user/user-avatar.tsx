import type { User } from "auth/solidstart/auth-client"
import { Avatar, AvatarFallback, AvatarImage } from "lib-ui/solid/ui/avatar"
import { type ComponentProps, splitProps } from "solid-js"

function getAvatarFallback(user: User) {
	return (user.name || user.email).slice(0, 2)
}

export default function UserAvatar(props: { user: User } & ComponentProps<typeof Avatar>) {
	const [local, rest] = splitProps(props, ["user"])
	return (
		<Avatar {...rest}>
			<AvatarImage src={local.user?.image ?? ""} alt="user avatar" />
			<AvatarFallback class="uppercase">{getAvatarFallback(local?.user)}</AvatarFallback>
		</Avatar>
	)
}
