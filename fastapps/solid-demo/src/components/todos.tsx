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
		<main>
			<Show when={taskRepo.metadata.apiInsertAllowed()}>
				<form onSubmit={addTask}>
					<input
						value={newTaskTitle()}
						placeholder="What needs to be done?"
						onInput={(e) => setNewTaskTitle(e.currentTarget.value)}
					/>
					<button type="submit">Add</button>
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
							<input type="checkbox" checked={task.completed} oninput={(e) => setCompleted(e.target.checked)} />
							<input value={task.title} onInput={(e) => setTasks(i(), "title", e.target.value)} />
							<button type="button" onClick={saveTask}>
								Save
							</button>
							<Show when={taskRepo.metadata.apiDeleteAllowed()}>
								<button type="button" onClick={deleteTask}>
									Delete
								</button>
							</Show>
						</div>
					)
				}}
			</For>

			<div>
				<button type="button" onClick={() => setAllCompleted(true)}>
					Set All Completed
				</button>
				<button type="button" onClick={() => setAllCompleted(false)}>
					Set All Uncompleted
				</button>
			</div>
		</main>
	)
}
