import {
	type Accessor,
	createContext,
	createEffect,
	createSignal,
	type ParentProps,
	useContext,
} from "solid-js"
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
	const defaultTheme = props.defaultTheme === "light" ? "light" : "dark"
	const [theme, setTheme] = createSignal<BinaryTheme>(defaultTheme)
	const toggleTheme = () => setTheme((prev) => (prev === "light" ? "dark" : "light"))
	createEffect(() => document.body.classList.toggle("dark", theme() === "dark"))

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
			{props.children}
		</UiContext.Provider>
	)
}
