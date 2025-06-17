import { action, redirect, useSubmission } from "@solidjs/router"
import { Show } from "solid-js"
import { authClient } from "~/lib/clients"

const loginAction = action(
	async (formData: FormData) =>
		authClient.signIn.guestList({ name: formData.get("name")?.toString() ?? "" }).then(({ error, data }) => {
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
	const s = authClient.useSession()
	const user = () => s().data?.user

	return (
		<>
			<h1>Login</h1>
			<main>
				<Show when={user()}>
					<div>
						<span>You're already logged in as:</span>
						<span>{user()?.name}</span>
					</div>
				</Show>
				<form action={loginAction} method="post">
					<input type="text" name="name" placeholder="Guest name" />
					<button type="submit">Sign in</button>
				</form>
				<Show when={sub.result?.message}>{sub.result?.message}</Show>
			</main>
		</>
	)
}
