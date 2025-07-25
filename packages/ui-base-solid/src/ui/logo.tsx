import type { Component, ComponentProps } from "solid-js"

export function Logo(props: {
	icon: Component<{ class?: string }>
	iconContainerClass?: string
	brand?: string
	brandContainerClass?: string
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
				<BrandName name={props.brand} class={props.brandContainerClass} />
			</div>
		)
	}

	// else, logo icon only
	return logo
}

export function BrandName(props: ComponentProps<"div"> & { name: string }) {
	return <div {...props}>{props.name}</div>
}

export function generateLogoComponents({
	brandIcon,
	brandName,
}: {
	brandIcon: Component
	brandName: string
}) {
	return {
		IconLogo: (props: Omit<ComponentProps<typeof Logo>, "icon">) => <Logo icon={brandIcon} {...props} />,
		WideLogo: (props: Omit<ComponentProps<typeof Logo>, "icon" | "brand">) => (
			<Logo icon={brandIcon} brand={brandName} {...props} />
		),
	}
}
