import { type Accessor, createContext, type JSXElement, type ParentProps, useContext } from "solid-js"
import { IconSolidjs } from "./icons"
import { BrandIcon, BrandLogo, BrandName } from "./ui"
import type { HrefLinkComponent } from "./utils"

type ContextValue = {
	HrefLink: HrefLinkComponent
	BrandName: ReturnType<typeof BrandName.with>
	BrandIcon: ReturnType<typeof BrandIcon.with>
	BrandLogo: ReturnType<typeof BrandLogo.with>
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
		brandIcon?: JSXElement
		brandName?: JSXElement
		brandLogo?: JSXElement
		useBreadcrumbs?: ContextValue["useBreadcrumbs"]
	}>
) {
	const name = props.brandName ?? "solidJS"
	const icon = props.brandIcon ?? <IconSolidjs class="size-full text-blue-500" />

	const ctx = {
		HrefLink: props.HrefLink,
		BrandName: BrandName.with({ name }),
		BrandIcon: BrandIcon.with({ icon }),
		BrandLogo: BrandLogo.with({ logo: props.brandLogo, name, icon }),
		useBreadcrumbs: () => {
			if (!props.useBreadcrumbs) {
				throw new Error("Please specify the useBreadcrumbs hook at the UiProvider level")
			}
			return props.useBreadcrumbs()
		},
	}

	return <UiContext.Provider value={ctx}>{props.children}</UiContext.Provider>
}
