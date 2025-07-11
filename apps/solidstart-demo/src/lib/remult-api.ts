"user server"
import { Account, Session, User, Verification } from "core/models/auth-models"
import { Task, TasksController } from "core/models/task"
import { getRemultUserFromBetterAuth } from "core/utils/remult-ba"
import { InMemoryDataProvider } from "remult"
import { remultApi as solidStartRemultApi } from "remult/remult-solid-start"
import { JsonFileDataProvider } from "remult/server"
import { auth } from "./auth"

export const remultApi = solidStartRemultApi({
	entities: [Task, User, Session, Account, Verification],
	controllers: [TasksController],
	rootPath: __REMULT_API_PATH__,
	logApiEndPoints: true,
	admin: true,
	dataProvider: new JsonFileDataProvider(__REMULT_LOCAL_DB_DIR__ ?? "./db"),
	//dataProvider: new InMemoryDataProvider(),
	getUser: async ({ request }: { request: Request }) => getRemultUserFromBetterAuth(auth, request),
})
