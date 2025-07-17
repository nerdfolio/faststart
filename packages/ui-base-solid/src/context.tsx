import { type Accessor, createContext, createSignal, type ParentProps, useContext } from "solid-js"
import type { HrefLink } from "./wrap-link"

type BinaryTheme = "light" | "dark"
type ContextValue = {
	HrefLink: HrefLink
	useBreadcrumbs: () => Accessor<string[]>
	theme: Accessor<BinaryTheme>
	toggleTheme: () => string
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
		HrefLink: HrefLink
		useBreadcrumbs?: ContextValue["useBreadcrumbs"]
		defaultTheme?: BinaryTheme
	}>
) {
	const [theme, setTheme] = createSignal<BinaryTheme>(props.defaultTheme ?? "dark")
	const toggleTheme = () => setTheme((prev) => (prev === "light" ? "dark" : "light"))

	const ctx = {
		HrefLink: props.HrefLink,
		useBreadcrumbs: () => {
			if (!props.useBreadcrumbs) {
				throw new Error("Please specify the useBreadcrumbs hook at the UiProvider level")
			}
			return props.useBreadcrumbs()
		},
		theme,
		toggleTheme,
	}

	return (
		<UiContext.Provider value={ctx}>
			<div class={theme()}>{props.children}</div>
		</UiContext.Provider>
	)
}
