import type { Component, ComponentProps } from "solid-js"

export function Logo(props: {
	icon: Component<{ class?: string }>
	iconContainerClass?: string
	class?: string
	brand?: string
}) {
	const Icon = props.icon
	const icon = <Icon class="size-full text-blue-500" />

	const logo = (
		<div
			class={
				props.iconContainerClass ??
				"flex size-8 items-center justify-center rounded-md bg-primary text-primary-foreground"
			}
		>
			{icon}
		</div>
	)

	if (props.brand) {
		// wide logo with brand on the right
		return (
			<div class="flex items-center gap-2 self-center font-medium">
				{logo}
				<BrandName name={props.brand} />
			</div>
		)
	}

	// else, logo icon only
	return logo
}

export function BrandName(props: ComponentProps<"span"> & { name: string }) {
	return <span {...props}>{props.name}</span>
}
