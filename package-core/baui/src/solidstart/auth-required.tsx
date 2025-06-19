import { Navigate } from "@solidjs/router"
import type { ParentProps } from "solid-js"
import { Show } from "solid-js"
import type { BetterAuthClient } from "./types"

export default function AuthRequired(props: ParentProps & { loginUrl?: string; authClient: BetterAuthClient }) {
	const s = props.authClient.useSession()

	return (
		<Show when={s().data} fallback={<div>Loading...</div>}>
			<Show when={s().data?.user} fallback={<Navigate href={props.loginUrl || "/login"} />}>
				{props.children}
			</Show>
		</Show>
	)
}
