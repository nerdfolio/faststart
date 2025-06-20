"user server"
import { makeGetRequestUser } from "auth-core/solidstart/auth-server"
import { baToRemultUser } from "data-core/glue/remult-ba"
import { Account, Session, User, Verification } from "data-core/models/auth-models"
import { remultApi as solidStartRemultApi } from "remult/remult-solid-start"
import { Task } from "../shared/Task"
import { TasksController } from "../shared/TasksController"
import { auth } from "./auth"

const authEntities = [User, Session, Account, Verification]
export const remultApi = solidStartRemultApi({
	entities: [Task, ...authEntities],
	controllers: [TasksController],
	admin: true,
	rootPath: import.meta.env.VITE_REMULT_ROOT_PATH,
	logApiEndPoints: true,
	// dataProvider: createD1DataProvider(serverEnv.DB),
	getUser: makeGetRequestUser(auth, { transformUser: baToRemultUser }),
})
