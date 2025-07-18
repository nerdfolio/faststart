import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export * from "./internal/wrap-link"

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs))
}

export function sleep(ms: number) {
	return new Promise((resolve) => setTimeout(resolve, ms))
}

function initDarkMode() {
	function getCookie(name: string) {
		const match = document.cookie.match(new RegExp(`(^| )${name}=([^;]+)`))
		if (match) return match[2]
		return null
	}

	if (getCookie("ui-base-solid-isDarkMode") === "true") {
		document.documentElement.classList.add("dark")
	}
}

export const initDarkModeScript = `(${initDarkMode.toString()})()`
