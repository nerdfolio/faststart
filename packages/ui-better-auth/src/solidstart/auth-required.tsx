import { Navigate } from "@solidjs/router"
import type { User } from "better-auth"
import { createEffect, createSignal, type ParentProps, Show } from "solid-js"
import type { BetterAuthClient } from "./types"

type AuthRequiredProps = ParentProps & {
	loginUrl?: string
	session: ReturnType<BetterAuthClient["useSession"]>
	userCallback?: (u: User) => void // call when confirmed user is logged in
}
export default function AuthRequired(props: AuthRequiredProps) {
	// NOTE: 6/27/2005. Better auth seems to have a bug where user is authenticated, isPending is false,
	// but for a split second, "data" is also null. We work around this by forcing a very short delay
	const [ready, setReady] = createSignal(false)
	props.session()
	setTimeout(() => {
		setReady(true)
	}, 50)

	createEffect(() => {
		if (props.session().data?.user) {
			props.userCallback?.(props.session().data?.user!)
		}
	})

	return (
		<Show when={!props.session().isPending && ready()}>
			<Show when={props.session().data?.user} fallback={<Navigate href={props.loginUrl || "/login"} />}>
				{props.children}
			</Show>
		</Show>
	)
}
