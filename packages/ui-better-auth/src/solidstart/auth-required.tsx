import type { ParentProps } from "solid-js"
import { AuthGuard } from "../solid/auth-guard"
import { NavigateToLogin } from "./navigate-to-login"

export function AuthRequired(props: ParentProps<{ loginUrl: string }>) {
	return <AuthGuard fallback={<NavigateToLogin loginUrl={props.loginUrl} />} />
}
