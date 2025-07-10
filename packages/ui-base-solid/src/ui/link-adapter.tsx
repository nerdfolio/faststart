import { type Component, type ComponentProps, type JSXElement, splitProps } from "solid-js"

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
