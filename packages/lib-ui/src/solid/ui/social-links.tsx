import { type ComponentProps, For } from "solid-js"
import { cn } from "../../utils"
import { IconBluesky, IconGithub, IconX } from "../icons"

const ICON_MAP = {
	github: IconGithub,
	bluesky: IconBluesky,
	x: IconX,
} as const
type SocialType = keyof typeof ICON_MAP

export default function SocialLinks(
	props: ComponentProps<"div"> & { linkClass?: string; socialLinks: Record<SocialType, string> }
) {
	return (
		<div class={cn("flex flex-row gap-8", props.class)}>
			<For each={Object.entries(props.socialLinks)}>
				{([type, href]) => <SocialLink type={type as SocialType} href={href} class={props.linkClass} />}
			</For>
		</div>
	)
}

export function SocialLink(props: ComponentProps<"a"> & { type: SocialType }) {
	const SocialIcon = ICON_MAP[props.type]
	return (
		<a href={props.href} target="_blank" rel="noreferrer" class={props.class}>
			<SocialIcon />
		</a>
	)
}
