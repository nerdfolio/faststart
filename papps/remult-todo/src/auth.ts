import { anonymous } from "better-auth/plugins"
import { initBetterAuth } from "remult-core/solidstart"
import { apiRemult } from "./api"

export const auth = initBetterAuth(apiRemult, {
	plugins: [anonymous()],
})
