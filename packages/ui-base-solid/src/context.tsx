import { cookieStorage, makePersisted } from "@solid-primitives/storage"
import { type Accessor, createContext, createSignal, onMount, type ParentProps, useContext } from "solid-js"
import type { HrefLink } from "./internal/wrap-link"

type ContextValue = {
	HrefLink: HrefLink
	useBreadcrumbs: () => Accessor<string[]>
	isDarkMode: Accessor<boolean>
	toggleDarkMode: () => boolean
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
	}>
) {
	//
	// dark mode handling. Initialized to true, after that, it's based on the cookie value
	//
	const [isDarkMode, setDarkMode] = makePersisted(createSignal(true), {
		name: "ui-base-solid-isDarkMode",
		storage: cookieStorage,
	})
	onMount(() => {
		// rely on an outer mechanism to already set <html class="dark">
		setDarkMode(document.documentElement.classList.contains("dark"))
	})

	const toggleDarkMode = () => {
		setDarkMode((prev) => !prev)
		document.startViewTransition?.()
		document.documentElement.classList.toggle("dark", isDarkMode())
	}

	const ctx = {
		HrefLink: props.HrefLink,
		useBreadcrumbs: () => {
			if (!props.useBreadcrumbs) {
				throw new Error("Please specify the useBreadcrumbs hook at the UiProvider level")
			}
			return props.useBreadcrumbs()
		},
		isDarkMode,
		toggleDarkMode,
	}

	return <UiContext.Provider value={ctx}>{props.children}</UiContext.Provider>
}
