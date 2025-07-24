import { createFileRoute } from "@tanstack/solid-router"
import Todos from "~/components/todos"

export const Route = createFileRoute("/_protected/todos")({
	component: TodosPage,
})

function TodosPage() {
	return (
		<div class="place-items-center">
			<Todos />
		</div>
	)
}
