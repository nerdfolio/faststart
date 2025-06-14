import { remultApi } from "remult/remult-solid-start"
import { Task } from "../models/task"
import { createD1DataProvider } from "remult-d1/remult-d1"

export const api = remultApi({
	entities: [Task],
	dataProvider: createD1DataProvider(),
	//getUser,
	//admin: true,
})
