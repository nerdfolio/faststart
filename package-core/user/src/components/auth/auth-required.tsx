import { Navigate } from "@solidjs/router"
import type { ParentProps } from "solid-js"
import { Show } from "solid-js"
import { IconSpinner } from "ui-solid/icons"
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
