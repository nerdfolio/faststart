import {
	type Accessor,
	type Component,
	type ComponentProps,
	createContext,
	type JSXElement,
	type ParentProps,
	splitProps,
	useContext,
} from "solid-js"

type ContextValue = {
	HrefLink: AdaptedLink
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

export function UiProvider(props: ParentProps<ContextValue>) {
	const ctx = {
		HrefLink: props.HrefLink,
		useBreadcrumbs: () => {
			if (!props.useBreadcrumbs) {
				throw new Error("Please specify the useBreadcrumbs hook at the UiProvider level")
			}
			return props.useBreadcrumbs()
		},
	}

	return <UiContext.Provider value={ctx}>{props.children}</UiContext.Provider>
}

// Below are helpers to handle adaptation of the Link component
//

type AdaptedLinkProps = ComponentProps<"a"> & {
	href: string
}

type HrefKey = "to" | "href"
type FrameworkLinkProps<T extends HrefKey> = ComponentProps<"a"> & {
	[K in T]: string
} & Record<string, any>

/**
 * To adapt the rest of the components to various routing frameworks, the LinkComponent will need
 * to be defined by user to leverage framework-specific linking
 */
export type AdaptedLink = (props: AdaptedLinkProps) => JSXElement

/**
 * Helper to simplify wrapping of framework Link component to the version we need
 * @param FrameworkLink
 * @param hrefKey
 * @returns
 */
export function wrapLink<T extends HrefKey>(
	FrameworkLink: Component<ComponentProps<"a"> & FrameworkLinkProps<T>>,
	hrefKey: T
) {
	if (hrefKey === "to") {
		const linkTo: AdaptedLink = (props: AdaptedLinkProps) => {
			const [local, rest] = splitProps(props, ["href"])
			return (
				<FrameworkLink to={local.href} {...rest}>
					{props.children}
				</FrameworkLink>
			)
		}
		return linkTo
	}

	const linkHref: AdaptedLink = (props: AdaptedLinkProps) => (
		<FrameworkLink {...props}>{props.children}</FrameworkLink>
	)
	return linkHref
}

// export function wrapHrefLink(FrameworkLink: Component<ComponentProps<"a"> & { href: string }>) {
// 	return (props: AdaptedLinkProps) => <FrameworkLink {...props}>{props.children}</FrameworkLink>
// }

// export function wrapToLink(FrameworkLink: Component<ComponentProps<"a"> & { to: string }>) {
// 	return (props: AdaptedLinkProps) => {
// 		const [local, rest] = splitProps(props, ["href"])
// 		return (
// 			<FrameworkLink to={local.href} {...rest}>
// 				{props.children}
// 			</FrameworkLink>
// 		)
// 	}
// }
