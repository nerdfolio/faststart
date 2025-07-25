import {
	type Accessor,
	type Component,
	type ComponentProps,
	createContext,
	type ParentProps,
	useContext,
} from "solid-js"
import { BrandNameAndLogo } from "./ui"
import type { HrefLinkComponent } from "./utils"

type ContextValue = {
	HrefLink: HrefLinkComponent
	Branding: Component
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
		Branding?: Component
		useBreadcrumbs?: ContextValue["useBreadcrumbs"]
	}>
) {
	const ctx = {
		HrefLink: props.HrefLink,
		Branding: props.Branding ?? DefaultBranding,
		useBreadcrumbs: () => {
			if (!props.useBreadcrumbs) {
				throw new Error("Please specify the useBreadcrumbs hook at the UiProvider level")
			}
			return props.useBreadcrumbs()
		},
	}

	return <UiContext.Provider value={ctx}>{props.children}</UiContext.Provider>
}

function DefaultBranding(props: Omit<ComponentProps<typeof BrandNameAndLogo>, "name">) {
	return <BrandNameAndLogo href="/" name="solidJs" {...props} />
}
