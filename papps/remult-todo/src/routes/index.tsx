import { useNavigate } from "@solidjs/router"
import { Show } from "solid-js"
import { authClient } from "../auth-client"
import Todo from "../components/Todo.jsx"

export default function Home() {
	const session = authClient.useSession()
	const navigate = useNavigate()

	return (
		<div>
			indexxxx
			<Show when={!session().isPending} fallback={<div>Loading session...</div>}>
				<div>
					err: {JSON.stringify(session().error)} -- data: {JSON.stringify(session().data)}
				</div>
				<Show when={session().data?.user} fallback={<div>{JSON.stringify(session().data)}</div>}>
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
		</div>
	)
}
