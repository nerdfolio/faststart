// vite.config.ts

import tailwindcss from "@tailwindcss/vite"
import { tanstackStart } from "@tanstack/solid-start/plugin/vite"
import Icons from "unplugin-icons/vite"
import { defineConfig } from "vite"
import viteSolid from "vite-plugin-solid"
import tsConfigPaths from "vite-tsconfig-paths"

export default defineConfig({
	envDir: "../../",
	define: {
		__REMULT_API_PATH__: JSON.stringify("/api/r"),
		__REMULT_LOCAL_DB_DIR__: JSON.stringify("../../zztemp"),
		// biome-ignore lint/style/noProcessEnv: whatev
		__APP_VERSION__: JSON.stringify(process.env.npm_package_version),
	},
	server: {
		port: 3000,
	},
	plugins: [
		tsConfigPaths(),
		tanstackStart({ customViteSolidPlugin: true, target: "cloudflare-module" }),
		viteSolid({ ssr: true }),
		tailwindcss(),
		Icons({ compiler: "solid" }),
	],
})
