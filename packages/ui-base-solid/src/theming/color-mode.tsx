import {
	ColorModeProvider as CMProvider,
	type ColorModeProviderProps,
	ColorModeScript,
	type ColorModeStorageManager,
	cookieStorageManagerSSR,
} from "@kobalte/core"
import { splitProps } from "solid-js"
import { getRequestEvent, isServer } from "solid-js/web"

export { ColorModeScript }

export function ColorModeProvider(
	props: Omit<ColorModeProviderProps, "storageManager"> & {
		storageType: ColorModeStorageManager["type"]
		noInitScript?: boolean
	}
) {
	const [local, rest] = splitProps(props, ["storageType", "noInitScript"])

	// undefined storageManager means localStorage
	const storageManager = local.storageType === "cookie" ? makeCookieManager() : undefined

	// by default, we prepend the provider with an init script that sets color mode attributes
	// on the <html> tag before rendering happen so we don't have a flash of incorrect color mode.
	// To manually use your own script or add it elsewhere, set noInitScript to `true`
	return (
		<>
			{props.noInitScript ? null : <ColorModeScript storageType={local.storageType} />}
			<CMProvider {...rest} storageManager={storageManager} />
		</>
	)
}

function getServerCookie() {
	const headers = getRequestEvent()?.request.headers
	return headers?.get("Cookie") ?? ""
}

function makeCookieManager() {
	return cookieStorageManagerSSR(isServer ? getServerCookie() : document.cookie)
}
