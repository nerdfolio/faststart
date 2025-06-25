import { Navigate } from "@solidjs/router"
import type { ParentProps } from "solid-js"
import { Show } from "solid-js"
import type { BetterAuthClient } from "./types"

type AuthRequiredProps = ParentProps & {
	loginUrl?: string
	session?: ReturnType<BetterAuthClient["useSession"]>
}
export default function AuthRequired(
	props: AuthRequiredProps & { session: ReturnType<BetterAuthClient["useSession"]> }
) {
	return (
		<Show when={!props.session().isPending}>
			<Show when={props.session().data?.user} fallback={<Navigate href={props.loginUrl || "/login"} />}>
				{props.children}
			</Show>
		</Show>
	)
}
