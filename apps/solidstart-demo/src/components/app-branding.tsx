import { BrandNameAndLogo } from "@nerdfolio/ui-base-solid/ui"
import type { ComponentProps } from "solid-js"
import { appName } from "~/app-info"

export function AppBranding(props: Omit<ComponentProps<typeof BrandNameAndLogo>, "name">) {
	return <BrandNameAndLogo {...props} name={appName} />
}
