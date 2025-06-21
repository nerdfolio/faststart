import type { User } from "better-auth"
import type { UserInfo } from "remult"

type UserWithRole = User & { role?: string }

export function baToRemultUser<BAU extends UserWithRole>({ name, id, role = "" }: BAU) {
	return {
		name,
		id,
		roles: role.split(",").map((r) => r.trim()),
	} as UserInfo
}
