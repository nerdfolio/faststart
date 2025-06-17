import type { BetterAuthPlugin } from "better-auth"
import { APIError, createAuthEndpoint } from "better-auth/api"
import { setSessionCookie } from "better-auth/cookies"
import { capitalize } from "lodash-es"
import { z } from "zod/v4-mini"
import { getOrigin } from "./utils"

export interface GuestListOptions {
	/**
	 * Configure the domain name of the temporary email
	 * address for anonymous users in the database.
	 * @default "baseURL"
	 */
	emailDomainName?: string

	/**
	 * List of accepted guest names
	 */
	allowNames: string[]

	/**
	 * Whether to reveal the guest list to the client.
	 * Useful for demos
	 */
	revealNames?: boolean

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

function formatName(name: string) {
	return capitalize(name.replaceAll(/\s/g, ""))
}

export const guestList = (options?: GuestListOptions) => {
	const ERROR_CODES = {
		NAME_NOT_PROVIDED: "Guest name not provided",
		NAME_NOT_ON_GUEST_LIST: "Your name is not on the guest list",
		NAME_ONE_WORD_ONLY: "Please only use 1-word names",
		FAILED_TO_CREATE_USER: "Failed to create user",
		COULD_NOT_CREATE_SESSION: "Could not create session",
	} as const

	const cleanedGuestList = options?.allowNames.map(formatName) ?? []

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

					if (name.trim().split(/\s+/).length > 1) {
						ctx.context.logger.error("For simplicity, only one word names are allowed")
						throw new APIError("UNAUTHORIZED", {
							message: ERROR_CODES.NAME_ONE_WORD_ONLY,
						})
					}

					const cleanedName = formatName(name)

					if (!cleanedGuestList.includes(cleanedName)) {
						throw new APIError("UNAUTHORIZED", {
							message: options?.revealNames
								? `Name not on list. Try: ${JSON.stringify(cleanedGuestList)}`
								: ERROR_CODES.NAME_NOT_ON_GUEST_LIST,
						})
					}

					// generate email based the input name
					const { emailDomainName = getOrigin(ctx.context.baseURL) } = options ?? {}
					const email = `${cleanedName.toLowerCase().replaceAll(/\s/g, "")}.GUEST@${emailDomainName}`

					const found = await ctx.context.internalAdapter.findUserByEmail(email)

					async function createNewUser() {
						const newUser = await ctx.context.internalAdapter.createUser(
							{
								email,
								emailVerified: false,
								isAnonymous: true,
								name: cleanedName,
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
