import { A } from "@solidjs/router"
import type { ParentProps } from "solid-js"
import { UiProvider } from "../../context"
import { wrapLink } from "../../utils"

export { useUi } from "../../context"

/*
Provider adapter to simplify common usage of this ui context.
User can always go directly to UiProvider if needed
*/
export function SolidStartUiProvider(props: ParentProps) {
	return <UiProvider HrefLink={wrapLink(A, "href")} {...props} />
}
