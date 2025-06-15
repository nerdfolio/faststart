// src/routes/index.tsx

import { useNavigate } from "@solidjs/router"
import { remult } from "remult"
import { Show, createSignal, onMount } from "solid-js"
import Todo from "../components/Todo.jsx"
import { getUserOnServer } from "~/api.js"
import { signOut } from "~/auth-client.js"

export default function Home() {
	const [authenticated, setAuthenticated] = createSignal(false)
	const navigate = useNavigate()

	onMount(async () => {
		remult.user = await getUserOnServer()
		if (remult.authenticated()) setAuthenticated(true)
		else navigate("/login")
	})

	return (
		<Show when={authenticated()}>
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
