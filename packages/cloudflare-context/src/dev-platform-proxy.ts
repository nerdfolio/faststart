import path from "node:path"
import { once } from "lodash-es"
import { getPlatformProxy, unstable_readConfig } from "wrangler"

const devPersistPath = once(() => {
	// if needed, we should handle the --persist-to situation by processing argv or env vars.
	// For now, only handle the standard .wrangler/state/v3 situation

	const { configPath } = unstable_readConfig({})

	// according to https://developers.cloudflare.com/workers/wrangler/api/#getplatformproxy,
	// getPlatformProxy uses the persist path directly, whereas wrangler adds a /v3 suffix, so
	// we have to accommodate that here
	return configPath ? path.relative(".", path.join(path.dirname(configPath ?? ""), ".wrangler/state/v3")) : undefined
})

export const devPlatformProxy = once(async () => {
	// rely on unstable_readConfig to tell us where the persist dir is. Should work for both the
	// standard and monorepo situation

	const persistPath = devPersistPath()
	return getPlatformProxy<Env>({ persist: persistPath ? { path: persistPath } : true })
})

export async function devPlatformEnv() {
	return devPlatformProxy().then(({ env }) => env)
}
