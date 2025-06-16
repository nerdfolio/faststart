import { useNavigate } from "@solidjs/router"
import { Show } from "solid-js"
import Todo from "~/components/Todo"
import { authClient } from "../client"

export default function Home() {
	const session = authClient.useSession()
	const navigate = useNavigate()

	return (
		<Show when={!session().isPending} fallback={<div>Loading session...</div>}>
			<Show when={session().data?.user} fallback={<div>no user -- data: {JSON.stringify(session().data)}</div>}>
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
