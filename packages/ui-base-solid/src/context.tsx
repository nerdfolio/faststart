import {
	type Accessor,
	type Component,
	type ComponentProps,
	createContext,
	type ParentProps,
	useContext,
} from "solid-js"
import { BrandNameAndLogo, Logo } from "./ui"
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
		Logo?: Component
		useBreadcrumbs?: ContextValue["useBreadcrumbs"]
	}>
) {
	const ctx = {
		HrefLink: props.HrefLink,
		Branding: props.Logo ?? DefaultBranding,
		useBreadcrumbs: () => {
			if (!props.useBreadcrumbs) {
				throw new Error("Please specify the useBreadcrumbs hook at the UiProvider level")
			}
			return props.useBreadcrumbs()
		},
	}

	return <UiContext.Provider value={ctx}>{props.children}</UiContext.Provider>
}

function DefaultBranding(props: Omit<ComponentProps<typeof Logo>, "withName">) {
	return <Logo withName="solidJs" {...props} />
}
