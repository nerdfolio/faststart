import { A } from "@solidjs/router"
import type { ComponentProps } from "solid-js"
import { UiProvider } from "../../context"
import { BrandNameAndLogo } from "../../ui"
import { wrapLink } from "../../utils"

export { useUi } from "../../context"

/*
Provider adapter to simplify common usage of this ui context.
User can always go directly to UiProvider if needed
*/
export function SolidStartUiProvider(props: Omit<ComponentProps<typeof UiProvider>, "HrefLink">) {
	return <UiProvider HrefLink={wrapLink(A, "href")} Logo={DefaultBranding} {...props} />
}

function DefaultBranding(props: Omit<ComponentProps<typeof BrandNameAndLogo>, "name">) {
	return <BrandNameAndLogo href="/" name="solidStart" {...props} />
}
