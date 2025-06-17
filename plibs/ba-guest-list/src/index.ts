import type { BetterAuthPlugin, User } from "better-auth"
import { APIError, createAuthEndpoint } from "better-auth/api"
import { setSessionCookie } from "better-auth/cookies"
import { z } from "zod/v4-mini"
import { getOrigin } from "./utils"

export interface GuestUser extends User {
	isAnonymous: boolean
}
export interface GuestListOptions {
	/**
	 * Name of the guest user
	 */
	name: string
	/**
	 * Configure the domain name of the temporary email
	 * address for anonymous users in the database.
	 * @default "baseURL"
	 */
	emailDomainName?: string
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
		NO_REPEATED_SIGNIN: "No repeated signin allowed",
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

					// generate email based the input name
					const { emailDomainName = getOrigin(ctx.context.baseURL) } = options ?? {}
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

		//schema: mergeSchema(schema, options?.schema),
		$ERROR_CODES: ERROR_CODES,
	} satisfies BetterAuthPlugin
}
