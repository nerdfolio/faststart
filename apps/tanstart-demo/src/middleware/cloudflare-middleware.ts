/// <reference types="../../worker-configuration" />
//
import { createMiddleware } from "@tanstack/solid-start"

export const cloudflareEnvMiddleware = createMiddleware({ type: "request" }).server(
	async ({ next, context }) => {
		console.log("context", context)
		if (!context) {
			throw new Error("no middleware context")
		}

		if (import.meta.env.DEV) {
			const { getPlatformProxy } = await import("wrangler")
			return next({
				context: {
					cloudflare: await getPlatformProxy<Env>(),
				},
			})
		}

		return next()
	}
)

//   createMiddleware({
//   onRequest: async (event) => {
//     if (import.meta.env.DEV) {
//       const { getPlatformProxy } = await import("wrangler");
//       const proxy = await getPlatformProxy<Env>();
//       event.context.cloudflare = proxy;
//     }
//   },
// });
