"user server"
import { BetterAuthError } from "better-auth"
import { Account, Session, User, Verification } from "core/models/auth-models"
import { Task, TasksController } from "core/models/task"
import { baToRemultUser } from "core/utils/remult-ba"
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
	// dataProvider: createD1DataProvider(serverEnv.DB),
	getUser: async ({ request }: { request: Request }) => {
		const s = await auth.api.getSession({ headers: request.headers })

		if (!s) {
			throw new BetterAuthError("getUser: No session found in request.", JSON.stringify(request))
		}

		return baToRemultUser(s.user)
	},
})
