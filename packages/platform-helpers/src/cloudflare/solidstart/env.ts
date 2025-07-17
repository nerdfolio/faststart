import { getRequestEvent, type RequestEvent } from "solid-js/web"

// declare this so we don't have to depend on @solidjs/start/server just for the FetchEvent type
type FetchEvent = RequestEvent & {
	locals: Record<string, unknown>
	nativeEvent: {
		context: {
			cloudflare: Record<string, unknown>
		}
	}
}

export function getServerEnv() {
	"use server"

	// NOTE: ideally we should just extract the cloudflare env from the request event ourselves
	// but currently DEV mode runs in Node and cloudflare's getPlatformProxy is an async function.
	// We have to use middleware to inject env into locals so we can use it here synchronously.
	//
	// For this getServerEnv() function to work synchronously, we rely on middlewares to inject either
	// getPlatformProxy() env or real cloudflare env into locals.serverEnv
	//
	// Having a synchronous getServerEnv() makes many things simpler, including defining and exporting lib.db
	// synchronously.
	const event = getRequestEvent() as FetchEvent | undefined
	const env = event?.locals.serverEnv

	if (event && !env) {
		console.warn("*** serverEnv is empty. Have you used injectServerEnvMiddleware? ***")
	}

	return (env ?? {}) as Env
}

export async function injectServerEnvMiddleware(event: FetchEvent) {
	event.locals.serverEnv = await getCfEnv(event)
}

export const isCfRuntime = navigator.userAgent === "Cloudflare-Workers"

async function getCfEnv(event: FetchEvent) {
	return import.meta.env.DEV ? await __devEnv() : (event.nativeEvent.context.cloudflare?.env as Env)
}

//
// wrap in DEV check and use dynamic import so it it doesn't break the build
//
const __devEnv = import.meta.env.DEV
	? () => import("../dev-platform-proxy").then(({ devPlatformEnv }) => devPlatformEnv())
	: () => Promise.reject("devPlatformProxy is only available in DEV mode")
