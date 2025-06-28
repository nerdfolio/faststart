import { Show } from "solid-js"
import Todos from "~/components/todos"
import { authClient } from "~/lib/clients"

export default function Home() {
	const s = authClient.useSession()

	return (
		<Show when={s().data} fallback={<div>Loading session...</div>}>
			<Todos />
		</Show>
	)
}
