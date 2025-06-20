import type { ComponentProps, JSXElement } from "solid-js"

export default function DefaultLink(props: ComponentProps<"a">) {
	return <a {...props} />
}

type LinkProps = ComponentProps<"a"> & {
	href: string
}
export type LinkComponent = (props: LinkProps) => JSXElement
