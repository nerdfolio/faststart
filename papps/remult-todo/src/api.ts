// src/api.ts

import { remultApi } from 'remult/remult-solid-start'
import { getUser } from './auth'
import { Task } from './shared/Task'
import { TasksController } from './shared/TasksController'

export const api = remultApi({
	entities: [Task],
	controllers: [TasksController],
	getUser,
	admin: true
})