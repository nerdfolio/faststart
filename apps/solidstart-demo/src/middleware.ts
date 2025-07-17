import { createMiddleware } from "@solidjs/start/middleware"
import { injectServerEnvMiddleware } from "cloudflare-utils/solidstart"
export default createMiddleware({
	onRequest: injectServerEnvMiddleware,
})
