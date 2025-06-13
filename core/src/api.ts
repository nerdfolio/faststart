import { remultApi } from "remult/remult-solid-start"
import { getUser } from "./auth"
import { Task } from "../schema/task"
import { createD1DataProvider } from "remult-d1/remult-d1"

export const api = remultApi({
	entities: [Task],
	getUser,
	dataProvider: createD1DataProvider(DB),
	admin: true,
})