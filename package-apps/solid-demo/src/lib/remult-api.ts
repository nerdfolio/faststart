"user server"
import { makeGetRequestUser } from "fastcore/auth/utils"
import { Account, Session, User, Verification } from "fastcore/models/auth-models"
import { Task, TasksController } from "fastcore/models/task"
import { baToRemultUser } from "fastcore/utils/remult-ba"
import { remultApi as solidStartRemultApi } from "remult/remult-solid-start"
import { auth } from "./auth"

const authEntities = [User, Session, Account, Verification]
export const remultApi = solidStartRemultApi({
	entities: [Task, ...authEntities],
	controllers: [TasksController],
	// admin: true,
	rootPath: import.meta.env.VITE_REMULT_ROOT_PATH,
	logApiEndPoints: true,
	// dataProvider: createD1DataProvider(serverEnv.DB),
	getUser: makeGetRequestUser(auth, { transformUser: baToRemultUser }),
})
