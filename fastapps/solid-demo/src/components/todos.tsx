import { Alert, Button, Input } from "@nerdfolio/ui-base-solid/ui"
import { Task, TasksController } from "fastcore/models/task"
import { createSignal, For, onMount, Show } from "solid-js"
import { createStore } from "solid-js/store"
import { remultClient } from "~/lib/clients"

const taskRepo = remultClient.repo(Task)

export default function Todos() {
	const [tasks, setTasks] = createStore<Task[]>([])
	const [newTaskTitle, setNewTaskTitle] = createSignal("")

	async function addTask(e: Event) {
		e.preventDefault()
		try {
			const newTask = await taskRepo.insert({ title: newTaskTitle() })
			setTasks([...tasks, newTask])
			setNewTaskTitle("")
		} catch (error) {
			alert((error as { message: string }).message)
		}
	}

	async function setAllCompleted(completed: boolean) {
		await TasksController.setAllCompleted(completed)
	}

	onMount(() =>
		taskRepo
			.find({
				limit: 20,
				orderBy: { createdAt: "asc" },
				//where: { completed: true },
			})
			.then(setTasks)
	)

	return (
		<main class="flex flex-col gap-4">
			<Show
				when={taskRepo.metadata.apiInsertAllowed()}
				fallback={<Alert>You don't have permission to create tasks</Alert>}
			>
				<form onSubmit={addTask}>
					<Input
						value={newTaskTitle()}
						placeholder="What needs to be done?"
						onInput={(e) => setNewTaskTitle(e.currentTarget.value)}
					/>
					<Button type="submit">Add</Button>
				</form>
			</Show>

			<For each={tasks}>
				{(task, i) => {
					async function setCompleted(completed: boolean) {
						const updatedTask = await taskRepo.update(task, { completed })
						setTasks(i(), updatedTask)
					}

					async function saveTask() {
						try {
							await taskRepo.save(task)
						} catch (error) {
							alert((error as { message: string }).message)
						}
					}

					async function deleteTask() {
						try {
							await taskRepo.delete(task)
							setTasks(tasks.filter((t) => t !== task))
						} catch (error) {
							alert((error as { message: string }).message)
						}
					}

					return (
						<div>
							<Input type="checkbox" checked={task.completed} oninput={(e) => setCompleted(e.target.checked)} />
							<Input value={task.title} onInput={(e) => setTasks(i(), "title", e.target.value)} />
							<Button type="button" onClick={saveTask}>
								Save
							</Button>
							<Show when={taskRepo.metadata.apiDeleteAllowed()}>
								<Button type="button" onClick={deleteTask}>
									Delete
								</Button>
							</Show>
						</div>
					)
				}}
			</For>

			<div class="flex flex-row gap-2 justify-between">
				<Button type="button" onClick={() => setAllCompleted(true)}>
					Set All Completed
				</Button>
				<Button type="button" onClick={() => setAllCompleted(false)}>
					Set All Uncompleted
				</Button>
			</div>
		</main>
	)
}
