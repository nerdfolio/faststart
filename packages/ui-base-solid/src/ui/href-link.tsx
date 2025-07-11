import { type Component, type ComponentProps, type JSXElement, splitProps } from "solid-js"

type HrefLinkProps = ComponentProps<"a"> & {
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
export type HrefLink = (props: HrefLinkProps) => JSXElement

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
		const linkTo: HrefLink = (props: HrefLinkProps) => {
			const [local, rest] = splitProps(props, ["href"])
			return (
				<FrameworkLink to={local.href} {...rest}>
					{props.children}
				</FrameworkLink>
			)
		}
		return linkTo
	}

	const linkHref: HrefLink = (props: HrefLinkProps) => (
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
