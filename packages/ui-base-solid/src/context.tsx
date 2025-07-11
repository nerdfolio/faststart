import { createContext, type ParentProps, useContext } from "solid-js"
import type { AdaptedLink } from "./ui"

type ContextValue = {
	LinkComponent: AdaptedLink
}

const UiContext = createContext<ContextValue>()

export function useUi() {
	const ctx = useContext(UiContext)

	if (!ctx) {
		throw new Error("useUi must be invoked within a UiProvider")
	}

	return ctx
}

export function UiProvider(props: ParentProps<ContextValue>) {
	const ctx = {
		LinkComponent: props.LinkComponent,
	}

	return <UiContext.Provider value={ctx}>{props.children}</UiContext.Provider>
}
