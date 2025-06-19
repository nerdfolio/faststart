import { IconSolidjs } from "ui-solid/icons"
import { cn } from "ui-solid/utils"
import type { ComponentProps } from "solid-js"

export const appName = __APP_INFO__.name
export const appLegalName = __APP_INFO__.legalName
export const copyrightStatement = __APP_INFO__.copyrightStatement
export const appVersion = __APP_INFO__.version

export function AppName(props: ComponentProps<"span">) {
	return <span {...props}>{appName}</span>
}

export function AppLogo(props: { class?: string; noBackground?: boolean }) {
	const appIcon = <IconSolidjs class="size-full text-blue-500" />

	if (props.noBackground) return appIcon

	return (
		<div
			class={cn("flex size-8 items-center justify-center rounded-md bg-primary text-primary-foreground", props.class)}
		>
			{appIcon}
		</div>
	)
}

export function AppBranding(props: { class?: string; href?: string }) {
	const wrapClass = cn("flex items-center gap-2 self-center font-medium", props.class)

	return props.href ? (
		<a href={props.href} class={wrapClass}>
			<AppLogo />
			<AppName />
		</a>
	) : (
		<div class={wrapClass}>
			<AppLogo />
			<AppName />
		</div>
	)
}
