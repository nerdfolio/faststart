import { onMount, Show } from "solid-js"
import Todos from "~/components/todos"
import { authClient, remultClient } from "~/lib/clients"

export default function Home() {
	const s = authClient.useSession()

	onMount(async () => {
		if (!remultClient.user) {
			await remultClient.initUser()
		}
	})

	return (
		<Show when={!s().isPending} fallback={<div>Loading session...</div>}>
			<Todos />
		</Show>
	)
}
