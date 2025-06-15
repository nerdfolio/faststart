import { anonymous } from "better-auth/plugins"
import { initBetterAuth } from "remult-core/solidstart"
import { api } from "./api"

export const auth = initBetterAuth(await api.getRemult(), {
	plugins: [anonymous()],
})
