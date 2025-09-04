import { IconDeviceFloppy, IconPlus, IconTrash } from "ui-solid/icons"
import { Button, Checkbox, Input } from "ui-solid/ui"

import { Task, TasksController } from "core/models/task"
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
		<main class="flex flex-col gap-4 px-4 min-w-xl">
			<form onSubmit={addTask} class="w-full">
				<div class="flex w-full items-center gap-2">
					<Input
						type="text"
						name="task"
						disabled={!taskRepo.metadata.apiInsertAllowed()}
						value={newTaskTitle()}
						placeholder={
							taskRepo.metadata.apiInsertAllowed() ? "What needs to be done?" : "Only admins can create tasks"
						}
						onInput={(e) => setNewTaskTitle(e.currentTarget.value)}
					/>
					<Button type="submit" variant="outline" disabled={!taskRepo.metadata.apiInsertAllowed()}>
						<IconPlus />
					</Button>
				</div>
			</form>

			<For each={tasks}>
				{(task, i) => {
					async function setCompleted(completed: boolean) {
						const updatedTask = await taskRepo.update(task, { completed })
						setTasks(i(), { ...updatedTask })
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
						<div class="flex w-full items-center gap-2">
							<Checkbox checked={task.completed} onChange={setCompleted} />
							<Input value={task.title} onInput={(e) => setTasks(i(), "title", e.target.value)} />
							<Button size="sm" type="button" variant="outline" onClick={saveTask}>
								<IconDeviceFloppy />
							</Button>
							<Show when={taskRepo.metadata.apiDeleteAllowed()}>
								<Button size="sm" type="button" variant="outline" onClick={deleteTask}>
									<IconTrash />
								</Button>
							</Show>
						</div>
					)
				}}
			</For>

			<div class="flex flex-row gap-2 justify-end">
				<Button type="button" variant="outline" onClick={() => setAllCompleted(true)}>
					Set All Completed
				</Button>
				<Button type="button" variant="outline" onClick={() => setAllCompleted(false)}>
					Set All Uncompleted
				</Button>
			</div>

			<div class="flex flex-row gap-2 justify-end text-muted-foreground text-sm">
				<span>{remultClient.user?.name}</span>:<span>{remultClient.user?.roles?.join(", ")}</span>
			</div>
		</main>
	)
}
