import { A } from "@solidjs/router"
import { type ComponentProps, splitProps } from "solid-js"
import { IconExternalLink } from "./icons"

export default function SmartLink(props: ComponentProps<typeof A> & { markExternalLink?: boolean }) {
	const [local, rest] = splitProps(props, ["markExternalLink", "children"])

	if (rest.href?.includes("://")) {
		return (
			<a target="_blank" rel="noreferrer" {...rest}>
				{local.children}
				{local.markExternalLink ? <IconExternalLink /> : null}
			</a>
		)
	}

	return <A {...rest}>{local.children}</A>
}
