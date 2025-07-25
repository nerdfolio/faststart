import { Link } from "@tanstack/solid-router"
import type { ComponentProps } from "solid-js"
import { IconSolidjs } from "~/icons"
import { UiProvider } from "../../context"
import { Logo } from "../../ui"
import { wrapLink } from "../../utils"

export { useUi } from "../../context"

/*
Provider adapter to simplify common usage of this ui context.
User can always go directly to UiProvider if needed
*/
export function TanStartUiProvider(props: Omit<ComponentProps<typeof UiProvider>, "HrefLink">) {
	return <UiProvider HrefLink={wrapLink(Link, "to")} Logo={LogoPlaceholder} {...props} />
}

function LogoPlaceholder() {
	return <Logo brand="tanstackStart" icon={IconSolidjs} />
}
