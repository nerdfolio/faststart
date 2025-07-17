import { createMiddleware } from "@solidjs/start/middleware"
import { injectServerEnvMiddleware } from "core/cloudflare-helpers/solidstart-env"
export default createMiddleware({
	onRequest: injectServerEnvMiddleware,
})
