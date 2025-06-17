import { Navigate, useNavigate } from "@solidjs/router"
import { Show } from "solid-js"
import Todo from "~/components/Todo"
import { authClient } from "~/lib/clients"

export default function Home() {
	const session = authClient.useSession()
	const navigate = useNavigate()

	return (
		<Show when={session().data} fallback={<div>Loading session...</div>}>
			<Show when={session().data?.user} fallback={<Navigate href="/login" />}>
				<h1>Todos</h1>
				<header>
					Hello {session().data?.user?.name}
					<button type="button" onClick={async () => authClient.signOut().then(() => navigate("/login"))}>
						Logout
					</button>
				</header>
				<Todo />
			</Show>
		</Show>
	)
}
