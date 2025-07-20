import { ColorModeProvider as CMP, type ColorModeProviderProps, cookieStorageManagerSSR } from "@kobalte/core"
import { splitProps } from "solid-js"
import { getRequestEvent, isServer } from "solid-js/web"

function getServerCookie() {
	const headers = getRequestEvent()?.request.headers
	return headers?.get("Cookie") ?? ""
}

function makeCookieStorageManager() {
	return cookieStorageManagerSSR(isServer ? getServerCookie() : document.cookie)
}

export function ColorModeProvider(
	props: Omit<ColorModeProviderProps, "storageManager"> & { useLocalStorage?: boolean }
) {
	const [local, rest] = splitProps(props, ["useLocalStorage"])
	return <CMP {...rest} storageManager={local.useLocalStorage ? undefined : makeCookieStorageManager()} />
}
