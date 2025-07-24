"user server"
import { getRemultUserFromBetterAuth } from "core/utils/remult-ba"
import { remultApi as solidStartRemultApi } from "remult/remult-solid-start"
import { JsonFileDataProvider } from "remult/server"
import { auth } from "./auth"

export const remultApi = solidStartRemultApi({
	//entities: [Task, User, Session, Account, Verification],
	entities: [],
	//controllers: [TasksController],
	rootPath: __REMULT_API_PATH__,
	logApiEndPoints: true,
	admin: true,
	dataProvider: new JsonFileDataProvider(__REMULT_LOCAL_DB_DIR__ ?? "./db"),
	// dataProvider: new InMemoryDataProvider(),
	getUser: async ({ request }: { request: Request }) => getRemultUserFromBetterAuth(auth, request),
})
