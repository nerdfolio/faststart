import { onMount } from "solid-js"
import Todos from "~/components/todos"
import { remultClient } from "~/lib/clients"

export default function TodosPage() {
	onMount(async () => {
		if (!remultClient.user) {
			await remultClient.initUser()
		}
	})

	return (
		<div class="place-items-center">
			<div>
				<Todos />
			</div>
		</div>
	)
}
