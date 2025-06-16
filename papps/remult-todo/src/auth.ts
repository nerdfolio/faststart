import { anonymous } from "better-auth/plugins"
import { initBetterAuth } from "remult-core/solidstart"
import { remultApi } from "./api"

export const auth = initBetterAuth(await remultApi.getRemult(), {
	plugins: [anonymous()],
})
