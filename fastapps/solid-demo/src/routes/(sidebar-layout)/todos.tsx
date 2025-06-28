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
				<div class="flex flex-row justify-between">
					<span>User: {remultClient.user?.name}</span>
					<span>Role: {JSON.stringify(remultClient.user?.roles)}</span>
				</div>
				<Todos />
			</div>
		</div>
	)
}
