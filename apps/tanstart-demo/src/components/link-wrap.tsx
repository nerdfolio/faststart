import type { LinkComponent } from "@nerdfolio/ui-base-solid/ui"
import { Link } from "@tanstack/solid-router"

export const LinkWrap: LinkComponent = (props) => <Link to={props.href} />
