export const IS_DARKMODE_COOKIE_NAME = "ui-base-solid-isDarkMode" as const

function initDarkMode() {
	function getCookie(name: string) {
		const match = document.cookie.match(new RegExp(`(^| )${name}=([^;]+)`))
		if (match) return match[2]
		return null
	}

	if (getCookie(IS_DARKMODE_COOKIE_NAME) === "true") {
		document.documentElement.classList.add("dark")
	}
}

export function generateInitDarkModeScript() {
	return `(${initDarkMode.toString().replace("IS_DARKMODE_COOKIE_NAME", JSON.stringify(IS_DARKMODE_COOKIE_NAME))})()`
}
