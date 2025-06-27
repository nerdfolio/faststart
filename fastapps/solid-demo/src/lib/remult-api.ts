"user server"
import { makeGetRequestUser } from "fastcore/auth/utils"
import { Account, Session, User, Verification } from "fastcore/models/auth-models"
import { Task, TasksController } from "fastcore/models/task"
import { baToRemultUser } from "fastcore/utils/remult-ba"
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
	getUser: makeGetRequestUser(auth, { transformUser: baToRemultUser }),
})
