// vite.config.ts

import tailwindcss from "@tailwindcss/vite"
import { tanstackStart } from "@tanstack/solid-start/plugin/vite"
import { defineConfig } from "vite"
import tsConfigPaths from "vite-tsconfig-paths"

export default defineConfig({
	envDir: "../../",
	server: {
		port: 3000,
	},
	plugins: [tsConfigPaths(), tanstackStart(), tailwindcss()],
})
