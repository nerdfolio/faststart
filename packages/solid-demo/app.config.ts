import { defineConfig } from "@solidjs/start/config"
import tailwindcss from "@tailwindcss/vite"
import Icons from "unplugin-icons/vite"
import { mergeConfig } from "vite"
import { viteBaseConfig } from "../../root-config"

export default defineConfig({
	vite: mergeConfig(viteBaseConfig, {
		plugins: [tailwindcss(), Icons({ compiler: "solid", autoInstall: true })],
		define: {
			__APP_INFO__: {
				name: "Solid Demo",
				legalName: "Solid Demo, Inc.",
				copyrightStatement: "© 2025 Solid Demo, Inc. All rights reserved.",
				// biome-ignore lint/nursery/noProcessEnv: <explanation>
				version: process.env.npm_package_version,
			},
		}
	})
	,
	server: {
		preset: "cloudflare-pages",
		compatibilityDate: "2025-04-29",
		rollupConfig: {
			external: ["node:async_hooks"],
		},
	},
	middleware: "./src/middleware.ts"
})
