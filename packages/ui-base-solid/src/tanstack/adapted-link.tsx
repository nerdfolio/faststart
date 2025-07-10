import { Link } from "@tanstack/solid-router"
import { wrapLink } from "../ui"

export const LinkTo = wrapLink(Link, "to")
