"user server"
import { getRemultUserFromBetterAuth } from "core/utils/remult-ba"
import { remultApi as tanstackStartRemult } from "./remult-tanstack-start"
import { JsonFileDataProvider } from "remult/server"
import { auth } from "./auth"
import { Task, TasksController } from "core/models/task"
import { Account, Session, User, Verification } from "core/models/auth-models"

export const remultApi = tanstackStartRemult({
	entities: [Task, User, Session, Account, Verification],
	controllers: [TasksController],
	rootPath: __REMULT_API_PATH__,
	logApiEndPoints: true,
	admin: true,
	dataProvider: new JsonFileDataProvider(__REMULT_LOCAL_DB_DIR__ ?? "./db"),
	// dataProvider: new InMemoryDataProvider(),
	getUser: async ({ request }: { request: Request }) => getRemultUserFromBetterAuth(auth, request),
})
