import type { ComponentProps, JSXElement } from "solid-js"

export default function DefaultLink(props: ComponentProps<"a">) {
	return <a {...props} />
}

export type LinkComponent = (props: ComponentProps<"a">) => JSXElement
