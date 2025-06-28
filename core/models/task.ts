// src/shared/Task.ts

import { Allow, BackendMethod, Entity, Fields, repo } from "remult"

@Entity("tasks", {
	allowApiCrud: Allow.authenticated,
	allowApiInsert: "admin",
	allowApiDelete: "admin",
})
export class Task {
	@Fields.cuid()
	id = ""

	@Fields.string<Task>({
		validate: (task) => task.title.length > 2 || "Too Short",
	})
	title = ""

	@Fields.boolean()
	completed = false

	@Fields.createdAt()
	createdAt?: Date
}

export class TasksController {
	@BackendMethod({ allowed: Allow.authenticated })
	static async setAllCompleted(completed: boolean) {
		const taskRepo = repo(Task)
		for (const task of await taskRepo.find()) {
			await taskRepo.save({ ...task, completed })
		}
	}
}
