import type { AdaptedLink } from "@nerdfolio/ui-base-solid/ui"
import { Link } from "@tanstack/solid-router"

export const LinkWrap: AdaptedLink = (props) => <Link to={props.href} />
