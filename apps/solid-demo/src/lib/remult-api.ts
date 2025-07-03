"user server"
import { Account, Session, User, Verification } from "core/models/auth-models"
import { Task, TasksController } from "core/models/task"
import { getRemultUserFromBetterAuth } from "core/utils/remult-ba"
import { remultApi as solidStartRemultApi } from "remult/remult-solid-start"
import { JsonFileDataProvider } from "remult/server"
import { auth } from "./auth"

export const remultApi = solidStartRemultApi({
	entities: [Task, User, Session, Account, Verification],
	controllers: [TasksController],
	rootPath: import.meta.env.VITE_REMULT_ROOT_PATH,
	logApiEndPoints: true,
	admin: true,
	dataProvider: new JsonFileDataProvider(import.meta.env.VITE_REMULT_DB_PATH ?? "./db"),
	getUser: async ({ request }: { request: Request }) => getRemultUserFromBetterAuth(auth, request),
})
