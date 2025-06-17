import { action, redirect, useSubmission } from "@solidjs/router"
import { Show } from "solid-js"
import { authClient } from "~/lib/clients"

const loginAction = action(
	async (_formData: FormData) =>
		authClient.signIn.anonymous().then(({ error, data }) => {
			if (error) {
				return new Error(error.message)
			}

			console.log("user", data.user, "signed in")
			throw redirect("/")
		}),
	"login"
)

export default function Home() {
	const sub = useSubmission(loginAction)
	return (
		<>
			<h1>Login</h1>
			<main>
				<form action={loginAction} method="post">
					<input type="text" name="username" placeholder="Just click signin" disabled />
					<button type="submit">Sign in</button>
				</form>
				<Show when={sub.result?.message}>{sub.result?.message}</Show>
			</main>
		</>
	)
}
