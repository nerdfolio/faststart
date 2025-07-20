import { ColorModeProvider as CMP, type ColorModeProviderProps, cookieStorageManagerSSR } from "@kobalte/core"
import { splitProps } from "solid-js"
import { getRequestEvent, isServer } from "solid-js/web"

export function ColorModeProvider(
	props: Omit<ColorModeProviderProps, "storageManager"> & { useLocalStorage?: boolean }
) {
	const [local, rest] = splitProps(props, ["useLocalStorage"])
	return <CMP {...rest} storageManager={local.useLocalStorage ? undefined : makeCookieManager()} />
}

function getServerCookie() {
	const headers = getRequestEvent()?.request.headers
	return headers?.get("Cookie") ?? ""
}

function makeCookieManager() {
	return cookieStorageManagerSSR(isServer ? getServerCookie() : document.cookie)
}
