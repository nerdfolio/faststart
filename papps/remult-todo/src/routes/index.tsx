// src/routes/index.tsx

import { useNavigate } from "@solidjs/router"
import { remult } from "remult"
import { Show } from "solid-js"
import { signOut, useSession } from "../auth-client"
import Todo from "../components/Todo.jsx"

export default function Home() {
	const session = useSession()
	const authenticated = () => !!session().data?.user
	const navigate = useNavigate()

	return (
		<Show when={authenticated()} fallback={<div>Not logged in</div>}>
			<h1>Todos</h1>
			<header>
				Hello {remult.user?.name}
				<button type="button" onClick={async () => signOut().then(() => navigate("/login"))}>
					Logout
				</button>
			</header>
			<Todo />
		</Show>
	)
}
