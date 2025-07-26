import type { ComponentProps, JSXElement } from "solid-js"
import { cn } from "../utils"

export function BrandIcon(props: ComponentProps<"div"> & { icon: JSXElement }) {
	return (
		<div
			class={cn(
				"flex size-8 items-center justify-center rounded-md bg-primary text-primary-foreground ",
				props.class
			)}
		>
			{props.icon}
		</div>
	)
}

export function BrandName(props: ComponentProps<"div"> & { name: JSXElement }) {
	return <div {...props}>{props.name}</div>
}

export function BrandLogo(
	props:
		| { logo: JSXElement; class?: string }
		| {
				icon: ComponentProps<typeof BrandIcon>["icon"]
				iconClass?: string
				name: ComponentProps<typeof BrandName>["name"]
				nameClass?: string
				class?: string
		  }
) {
	return (
		<div class={cn("flex items-center gap-2 self-center font-medium", props.class)}>
			{"logo" in props && props.logo ? (
				props.logo
			) : "icon" in props && props.icon ? (
				<>
					<BrandIcon icon={props.icon} class={props.iconClass} />
					<BrandName name={props.name} class={props.nameClass} />
				</>
			) : (
				<div>Logo Placeholder</div>
			)}
		</div>
	)
}

//
// HOCs to make usage simpler. With these, developers do not need to define type of props (or use empty props)
//
BrandIcon.with =
	({ icon }: { icon: JSXElement }) =>
	(props: Omit<ComponentProps<typeof BrandIcon>, "icon">) => <BrandIcon icon={icon} {...props} />
BrandName.with =
	({ name }: { name: JSXElement }) =>
	(props: Omit<ComponentProps<typeof BrandName>, "name">) => <BrandName name={name} {...props} />
BrandLogo.with = ({ logo, icon, name }: { logo?: JSXElement; name?: JSXElement; icon?: JSXElement }) => {
	return (props: Omit<ComponentProps<typeof BrandLogo>, "logo" | "icon" | "name">) => (
		<BrandLogo logo={logo} icon={icon} name={name} {...props} />
	)
}
