import { createMiddleware } from "@solidjs/start/middleware"
import { injectServerEnvMiddleware } from "platform-helpers/cloudflare/solidstart"
export default createMiddleware({
	onRequest: injectServerEnvMiddleware,
})
