// src/api.ts

import { SqlDatabase } from 'remult'
import { createD1HttpDataProvider } from 'remult-d1/remult-d1-http'
import { remultApi } from 'remult/remult-solid-start'
import { getUser } from './auth'
import { Task } from './shared/Task'
import { TasksController } from './shared/TasksController'

console.log("process.env", process.env.CLOUDFLARE_ACCOUNT_ID)

export const api = remultApi({
	entities: [Task],
	controllers: [TasksController],
	getUser,
	dataProvider: new SqlDatabase(createD1HttpDataProvider({
		accountId: process.env.CLOUDFLARE_ACCOUNT_ID ?? "",
		apiToken: process.env.CLOUDFLARE_D1_TOKEN ?? "",
		databaseId: "af1e900f-06b9-4d71-9ed7-78639cd7dc79",
	})),
	admin: true
})