import { type Accessor, type Component, createContext, type ParentProps, useContext } from "solid-js"
import { IconSolidjs } from "./icons"
import { Logo } from "./ui"
import type { HrefLinkComponent } from "./utils"

type ContextValue = {
	HrefLink: HrefLinkComponent
	IconLogo: Component
	WideLogo: Component
	useBreadcrumbs: () => Accessor<string[]>
}

const UiContext = createContext<ContextValue>()

export function useUi() {
	const ctx = useContext(UiContext)

	if (!ctx) {
		throw new Error("useUi must be invoked within a UiProvider")
	}

	return ctx
}

export function UiProvider(
	props: ParentProps<{
		HrefLink: HrefLinkComponent
		IconLogo?: Component
		WideLogo?: Component
		useBreadcrumbs?: ContextValue["useBreadcrumbs"]
	}>
) {
	const ctx = {
		HrefLink: props.HrefLink,
		IconLogo: props.IconLogo ?? IconLogoPlaceholder,
		WideLogo: props.WideLogo ?? WideLogoPlaceholder,
		useBreadcrumbs: () => {
			if (!props.useBreadcrumbs) {
				throw new Error("Please specify the useBreadcrumbs hook at the UiProvider level")
			}
			return props.useBreadcrumbs()
		},
	}

	return <UiContext.Provider value={ctx}>{props.children}</UiContext.Provider>
}

function IconLogoPlaceholder() {
	return <Logo icon={IconSolidjs} />
}
function WideLogoPlaceholder() {
	return <Logo brand="solidJs" icon={IconSolidjs} />
}
