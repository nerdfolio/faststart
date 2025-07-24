import { type Component, type ComponentProps, type JSXElement, splitProps } from "solid-js"

type LinkKey = "to" | "href"
type FrameworkLinkComponent<T extends LinkKey> = Component<
	ComponentProps<"a"> & {
		[K in T]: string
	}
>

//
// The link component used internally by this ui library. For ui components that use linking to work,
// this internal link component needs to be adapted to the framework link being used
// (e.g. `A` from @solidstart/router or `Link` from @tanstack/solid-router).
// Note: This file provides utility to do that adaptation. The intended place to do the adaptation
// is at the UiProvider level
//
export type HrefLinkComponent = (
	props: ComponentProps<"a"> & {
		href: string
	}
) => JSXElement

/**
 * Helper to simplify wrapping of framework Link component to the version we need
 * @param FrameworkLink
 * @param hrefKey
 * @returns an HrefLinkComponents that can receive an href from this library and convert to
 *          the appropriate framework link
 */
export function wrapLink<T extends LinkKey>(FrameworkLink: FrameworkLinkComponent<T>, hrefKey: T) {
	if (hrefKey === "to") {
		// meant for @tanstack/solid-router `Link`
		const linkTo: HrefLinkComponent = (props) => {
			const [local, rest] = splitProps(props, ["href"])
			const LinkComp = FrameworkLink as FrameworkLinkComponent<"to">
			return (
				<LinkComp to={local.href} {...rest}>
					{props.children}
				</LinkComp>
			)
		}
		return linkTo
	}

	// meant for solidstart `A`
	const LinkComp = FrameworkLink as FrameworkLinkComponent<"href">
	const linkHref: HrefLinkComponent = (props) => <LinkComp {...props}>{props.children}</LinkComp>
	return linkHref
}
