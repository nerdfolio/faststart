import { Navigate, useNavigate } from "@solidjs/router"
import { onMount, Show } from "solid-js"
import Todo from "~/components/Todo"
import { authClient, remultClient } from "~/lib/clients"

export default function Home() {
	const s = authClient.useSession()
	const navigate = useNavigate()

	onMount(async () => {
		if (!remultClient.user) {
			await remultClient.initUser()
		}
	})

	return (
		<Show when={s().data} fallback={<div>Loading session...</div>}>
			<Show when={s().data?.user} fallback={<Navigate href="/login" />}>
				<h1>Todos</h1>
				<header>
					Hello {s().data?.user?.name} | {(s().data?.user as unknown as { role: string }).role}
					<button type="button" onClick={async () => authClient.signOut().then(() => navigate("/login"))}>
						Logout
					</button>
				</header>
				<Todo />
			</Show>
		</Show>
	)
}
