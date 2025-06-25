import { resolve } from "node:path"
import Icons from "unplugin-icons/vite"
import { defineConfig } from "vite"
import dts from "vite-plugin-dts"

export default defineConfig({
	plugins: [
		Icons({ compiler: "solid" }),
		dts({ rollupTypes: true })
	],
	build: {
		copyPublicDir: false,
		lib: {
			entry: {
				ui: resolve(__dirname, "src/ui/index.tsx"),
				layouts: resolve(__dirname, "src/layouts/index.tsx"),
				"nav-menu": resolve(__dirname, "src/nav-menu/index.tsx"),
				solidstart: resolve(__dirname, "src/solidstart/index.tsx"),
				icons: resolve(__dirname, "src/icons.tsx"),
				utils: resolve(__dirname, "src/utils.ts")
			},
			name: "ui-base-solid",
			formats: ["es"],
		},
		rollupOptions: {
			external: [
				"solid-js",
				"@solidjs/router",
				"@kobalte/core",
				"class-variance-authority",
				"clsx",
				"tailwind-merge",
				"@iconify-json/lucide",
				"@iconify-json/tabler"
			],
		},
	},
})
