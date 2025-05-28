import { Navigate } from "@solidjs/router"
import { IconSpinner } from "lib-ui/solid/ui/icons"
import { Show } from "solid-js"
import type { ParentProps } from "solid-js"
import { useAuth } from "../auth-client"

export default function AuthRequired(props: ParentProps & { loginUrl?: string }) {
	return (
		<Show
			when={!useAuth().isPending}
			fallback={<IconSpinner class="animate-spin text-muted-foreground size-12 mx-auto my-[40svh]" />}
		>
			<Show when={useAuth().user?.id} fallback={<Navigate href={props.loginUrl || "/login"} />}>
				{props.children}
			</Show>
		</Show>
	)
}
