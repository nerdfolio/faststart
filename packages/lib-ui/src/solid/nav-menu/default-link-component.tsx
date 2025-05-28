import type { ComponentProps, JSXElement } from "solid-js"

export default function DefaultLinkComponent(props: ComponentProps<"a">) {
	return <a {...props} />
}

export type LinkComponent = (props: ComponentProps<"a">) => JSXElement
