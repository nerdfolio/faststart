import type { Component, ComponentProps } from "solid-js"
import { cn } from "../utils"

export function Logo(props: {
	withIcon: Component<{ class?: string }>
	class?: string
	noBackground?: boolean
	withName?: string
}) {
	const Icon = props.withIcon
	const icon = <Icon class="size-full text-blue-500" />
	const logo = props.noBackground ? (
		icon
	) : (
		<div
			class={cn(
				"flex size-8 items-center justify-center rounded-md bg-primary text-primary-foreground",
				props.class
			)}
		>
			{icon}
		</div>
	)

	if (props.withName) {
		return (
			<div class="flex items-center gap-2 self-center font-medium">
				{logo}
				<BrandName name={props.withName} />
			</div>
		)
	}

	return logo
}

function BrandName(props: ComponentProps<"span"> & { name: string }) {
	return <span {...props}>{props.name}</span>
}
