import type { BetterAuthOptions, User } from "better-auth"
import { createAuthClient } from "better-auth/solid"

// HACK: make an basic client to get its types. There probably is a better way
const _authClient = createAuthClient({ plugins: [] } as BetterAuthOptions)

export type BetterAuthClient = typeof _authClient

export type SessionAccessor = ReturnType<BetterAuthClient["useSession"]>

export type OnAuthFormError = (error: AuthSubmissionError) => void
export type OnAuthFormSuccess = (result: {
	/* authFlowCompleted
	 * @default true ;
	 * However some flow like magic-link does not complete after form submisttion
	*/
	authFlowCompleted?: boolean
	message?: string
	user?: User
}) => void

export type AuthSubmissionError = {
	code?: string
	message?: string
	status: number
	statusText: string
}