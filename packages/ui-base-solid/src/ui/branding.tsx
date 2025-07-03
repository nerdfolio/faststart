import type { ComponentProps } from "solid-js"
import { IconSolidjs } from "../icons"
import { cn } from "../utils"

export function BrandName(props: ComponentProps<"span"> & { name: string }) {
	return <span {...props}>{props.name}</span>
}

export function BrandLogo(props: { class?: string; noBackground?: boolean }) {
	const appIcon = <IconSolidjs class="size-full text-blue-500" />

	if (props.noBackground) return appIcon

	return (
		<div
			class={cn(
				"flex size-8 items-center justify-center rounded-md bg-primary text-primary-foreground",
				props.class
			)}
		>
			{appIcon}
		</div>
	)
}

export function BrandNameAndLogo(props: { name: string; class?: string; href?: string }) {
	const wrapClass = cn("flex items-center gap-2 self-center font-medium", props.class)

	return props.href ? (
		<a href={props.href} class={wrapClass}>
			<BrandLogo />
			<BrandName name={props.name} />
		</a>
	) : (
		<div class={wrapClass}>
			<BrandLogo />
			<BrandName name={props.name} />
		</div>
	)
}
