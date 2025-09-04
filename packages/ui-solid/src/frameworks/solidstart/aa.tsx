import { A } from "@solidjs/router"
import { type ComponentProps, splitProps } from "solid-js"
import { IconExternalLink } from "../../icons"

export function AA(props: ComponentProps<"a">) {
	const [local, rest] = splitProps(props, ["children", "href"])

	if (local.href?.includes("://")) {
		return (
			<a target="_blank" rel="noreferrer" {...rest}>
				{local.children}
				<IconExternalLink />
			</a>
		)
	}

	return (
		<A href={local.href ?? ""} {...rest}>
			{local.children}
		</A>
	)
}
