import type { AuthContext, BetterAuthPlugin, Session, User } from "better-auth"
import { APIError, createAuthEndpoint, createAuthMiddleware, getSessionFromCtx } from "better-auth/api"
import { parseSetCookieHeader, setSessionCookie } from "better-auth/cookies"
//import { mergeSchema } from "better-auth/db"
import type { EndpointContext } from "better-call"
import { z } from "zod/v4-mini"
import { getOrigin } from "./utils"

export interface GuestUser extends User {
	isAnonymous: boolean
}
export interface GuestListOptions {
	/**
	 * Name of the guest user
	 */
	name: string,
	/**
	 * Configure the domain name of the temporary email
	 * address for anonymous users in the database.
	 * @default "baseURL"
	 */
	emailDomainName?: string
	/**
	 * A useful hook to run after an anonymous user
	 * is about to link their account.
	 */
	onLinkAccount?: (data: {
		anonymousUser: {
			user: GuestUser & Record<string, unknown>
			session: Session & Record<string, unknown>
		}
		newUser: {
			user: User & Record<string, unknown>
			session: Session & Record<string, unknown>
		}
	}) => Promise<void> | void
	/**
	 * Disable deleting the anonymous user after linking
	 */
	disableDeleteAnonymousUser?: boolean
	/**
	 * A hook to generate a name for the anonymous user.
	 * Useful if you want to have random names for anonymous users, or if `name` is unique in your database.
	 * @returns The name for the anonymous user.
	 */
	generateName?: (
		ctx: EndpointContext<
			"/sign-in/guest-list",
			{
				method: "POST"
			},
			AuthContext
		>
	) => string
	/**
	 * Custom schema for the anonymous plugin
	 */
	// schema?: InferOptionSchema<typeof schema>
}

// const schema = {
// 	user: {
// 		fields: {
// 			isAnonymous: {
// 				type: "boolean",
// 				required: false,
// 			},
// 		},
// 	},
// } satisfies AuthPluginSchema

export const guestList = (options?: GuestListOptions) => {
	const ERROR_CODES = {
		NAME_NOT_PROVIDED: "Guest name not provided",
		FAILED_TO_CREATE_USER: "Failed to create user",
		COULD_NOT_CREATE_SESSION: "Could not create session",
		ANONYMOUS_USERS_CANNOT_SIGN_IN_AGAIN_ANONYMOUSLY: "Anonymous users cannot sign in again anonymously",
	} as const
	return {
		id: "guest-list",
		endpoints: {
			signInGuest: createAuthEndpoint(
				"/sign-in/guest-list",
				{
					method: "POST",
					body: z.object({
						name: z.string(),
					}),
					metadata: {
						openapi: {
							description: "Sign in as a guest with name only",
							responses: {
								200: {
									description: "Sign in as a guest successful",
									content: {
										"application/json": {
											schema: {
												type: "object",
												properties: {
													user: {
														$ref: "#/components/schemas/User",
													},
													session: {
														$ref: "#/components/schemas/Session",
													},
												},
											},
										},
									},
								},
							},
						},
					},
				},
				async (ctx) => {
					const { name } = ctx.body

					if (!name) {
						ctx.context.logger.error("Guest name not provided")
						throw new APIError("UNAUTHORIZED", {
							message: ERROR_CODES.NAME_NOT_PROVIDED,
						})
					}

					const { emailDomainName = getOrigin(ctx.context.baseURL) } = options || {}

					// generate email based the input name
					const email = `${name.toLowerCase()}.guest@${emailDomainName}`

					const found = await ctx.context.internalAdapter.findUserByEmail(email)

					async function createNewUser() {
						const newUser = await ctx.context.internalAdapter.createUser(
							{
								email,
								emailVerified: false,
								isAnonymous: true,
								name,
								createdAt: new Date(),
								updatedAt: new Date(),
							},
							ctx
						)
						if (!newUser) {
							throw ctx.error("INTERNAL_SERVER_ERROR", {
								message: ERROR_CODES.FAILED_TO_CREATE_USER,
							})
						}

						return newUser
					}

					const user = found ? found.user : await createNewUser()

					const session = await ctx.context.internalAdapter.createSession(user.id, ctx, true)

					if (!session) {
						return ctx.json(null, {
							status: 400,
							body: {
								message: ERROR_CODES.COULD_NOT_CREATE_SESSION,
							},
						})
					}
					await setSessionCookie(ctx, { session, user })

					return ctx.json({
						token: session.token,
						user: {
							id: user.id,
							email: user.email,
							emailVerified: user.emailVerified,
							name: user.name,
							createdAt: user.createdAt,
							updatedAt: user.updatedAt,
						},
					})
				}
			),
		},
		hooks: {
			after: [
				{
					matcher(ctx) {
						return (
							ctx.path.startsWith("/sign-in") ||
							ctx.path.startsWith("/sign-up") ||
							ctx.path.startsWith("/callback") ||
							ctx.path.startsWith("/oauth2/callback") ||
							ctx.path.startsWith("/magic-link/verify") ||
							ctx.path.startsWith("/email-otp/verify-email")
						)
					},
					handler: createAuthMiddleware(async (ctx) => {
						const setCookie = ctx.context.responseHeaders?.get("set-cookie")

						/**
						 * We can consider the user is about to sign in or sign up
						 * if the response contains a session token.
						 */
						const sessionTokenName = ctx.context.authCookies.sessionToken.name
						/**
						 * The user is about to link their account.
						 */
						const sessionCookie = parseSetCookieHeader(setCookie || "")
							.get(sessionTokenName)
							?.value.split(".")[0]

						if (!sessionCookie) {
							return
						}
						/**
						 * Make sure the user had an anonymous session.
						 */
						const session = await getSessionFromCtx<{ isAnonymous: boolean }>(ctx, {
							disableRefresh: true,
						})

						if (!session || !session.user.isAnonymous) {
							return
						}

						if (ctx.path === "/sign-in/guest-list") {
							throw new APIError("BAD_REQUEST", {
								message: ERROR_CODES.ANONYMOUS_USERS_CANNOT_SIGN_IN_AGAIN_ANONYMOUSLY,
							})
						}
						const newSession = ctx.context.newSession
						if (!newSession) {
							return
						}
						if (options?.onLinkAccount) {
							await options?.onLinkAccount?.({
								anonymousUser: session,
								newUser: newSession,
							})
						}
						if (!options?.disableDeleteAnonymousUser) {
							await ctx.context.internalAdapter.deleteUser(session.user.id)
						}
					}),
				},
			],
		},
		//schema: mergeSchema(schema, options?.schema),
		$ERROR_CODES: ERROR_CODES,
	} satisfies BetterAuthPlugin
}
