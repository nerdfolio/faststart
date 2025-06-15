import { Navigate, useNavigate } from "@solidjs/router"
import { Show } from "solid-js"
import { authClient } from "../auth-client"
import Todo from "../components/Todo.jsx"

export default function Home() {
	const session = authClient.useSession()
	const navigate = useNavigate()

	return (
		<Show when={!session().isPending}>
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
