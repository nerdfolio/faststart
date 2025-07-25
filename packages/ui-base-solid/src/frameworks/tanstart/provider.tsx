import { Link } from "@tanstack/solid-router"
import type { ComponentProps } from "solid-js"
import { UiProvider } from "../../context"
import { Logo } from "../../ui"
import { wrapLink } from "../../utils"

export { useUi } from "../../context"

/*
Provider adapter to simplify common usage of this ui context.
User can always go directly to UiProvider if needed
*/
export function TanStartUiProvider(props: Omit<ComponentProps<typeof UiProvider>, "HrefLink">) {
	return <UiProvider HrefLink={wrapLink(Link, "to")} Logo={DefaultBranding} {...props} />
}

function DefaultBranding(props: Omit<ComponentProps<typeof Logo>, "name">) {
	return <Logo withName="tanstackStart" {...props} />
}
