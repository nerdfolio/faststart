// src/routes/login.tsx

import { useSubmission } from "@solidjs/router"
import { Show } from "solid-js"
import { loginAction } from "../_auth.js"

export default function Home() {
	const sub = useSubmission(loginAction)
	return (
		<>
			<h1>Login</h1>
			<main>
				<form action={loginAction} method="post">
					<input type="text" name="username" placeholder="Username, try Steve or Jane" />
					<button type="submit">Sign in</button>
				</form>
				<Show when={sub.result?.message}>{sub.result?.message}</Show>
			</main>
		</>
	)
}
