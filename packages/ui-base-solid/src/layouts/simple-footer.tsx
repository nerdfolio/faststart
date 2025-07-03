import { type ComponentProps, Show } from "solid-js"
import { MenuAsNavLinks } from "../nav-menu"
import { Footer, type LinkComponent, SocialLinks, type SocialLinksType } from "../ui"

export function SimpleFooter(
	props: ComponentProps<typeof Footer> & {
		footerLinks: { href: string; label: string }[]
		Link: LinkComponent
		socialLinks?: SocialLinksType
		copyrightStatement?: string
	}
) {
	const socialLinks = props.socialLinks ?? null

	return (
		<Footer class="border-t-1">
			<MenuAsNavLinks
				items={props.footerLinks}
				Link={props.Link}
				linkClass="text-muted-foreground hover:brightness-130"
			/>
			<Show when={socialLinks}>
				<SocialLinks
					class="flex flex-row gap-8 justify-center my-8"
					linkClass="text-muted-foreground brightness-80 hover:brightness-130"
					socialLinks={socialLinks!}
				/>
			</Show>

			<p class="text-sm text-center text-muted-foreground">{props.copyrightStatement}</p>
		</Footer>
	)
}
