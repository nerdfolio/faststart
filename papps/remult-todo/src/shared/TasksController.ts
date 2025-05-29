// src/shared/TasksController.ts

import { Allow, BackendMethod, repo } from 'remult'
import { Task } from './Task'

// biome-ignore lint/complexity/noStaticOnlyClass: <explanation>
export class TasksController {
	@BackendMethod({ allowed: Allow.authenticated })
	static async setAllCompleted(completed: boolean) {
		const taskRepo = repo(Task)
		for (const task of await taskRepo.find()) {
			await taskRepo.save({ ...task, completed })
		}
	}
}