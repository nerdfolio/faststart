import { remultAdapter } from "@nerdfolio/remult-better-auth"
import { betterAuth } from "better-auth"
import { api } from "./api"
import { coreBetterAuthConfig } from "./better-auth/config"
import { Task } from "../models/task"

export const auth = betterAuth({
	...coreBetterAuthConfig,
	database: remultAdapter(await api.getRemult(), {
		authEntities: {Task},
	}),
})
