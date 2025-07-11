import { defineConfig } from "@solidjs/start/config"
import tailwindcss from "@tailwindcss/vite"
import Icons from "unplugin-icons/vite"
import { mergeConfig } from "vite"
import tsconfigPaths from "vite-tsconfig-paths"
import { viteBaseConfig } from "../../vite.config.base"

const appConfig = defineConfig({
	vite: mergeConfig(viteBaseConfig, {
		plugins: [tsconfigPaths(), tailwindcss(), Icons({ compiler: "solid", autoInstall: true })],
		define: {
			__REMULT_API_PATH__: JSON.stringify("/api/r"),
			__REMULT_LOCAL_DB_DIR__: JSON.stringify("../../zzdb"),
			// biome-ignore lint/style/noProcessEnv: whatev
			__APP_VERSION__: JSON.stringify(process.env.npm_package_version),
		},
	}),
	solid: {
		babel: {
			plugins: [
				["@babel/plugin-proposal-decorators", { version: "legacy" }],
				["@babel/plugin-transform-class-properties"],
				["@babel/plugin-transform-private-methods"],
			],
		},
	},
	server: {
		preset: "cloudflare-pages",
		compatibilityDate: "2025-06-20",
		rollupConfig: {
			external: ["node:async_hooks"],
		},
	},
	middleware: "./src/middleware.ts",
})

export default appConfig