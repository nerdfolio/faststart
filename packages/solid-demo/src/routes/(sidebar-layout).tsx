import AuthRequired from "auth/solidstart/components/auth-required"
import { SidebarLayout } from "lib-ui/solid/layouts"
import type { ParentProps } from "solid-js"
import { AppBranding } from "~/components/app-branding"

export default function ProtectedSidebarLayout(props: ParentProps) {
	return (
		<AuthRequired>
			<SidebarLayout>
				<SidebarLayout.Sidebar AppBranding={<AppBranding />} />
				<SidebarLayout.ContentArea>{props.children}</SidebarLayout.ContentArea>
			</SidebarLayout>
		</AuthRequired>
	)
}
