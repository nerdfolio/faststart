# SolidStart

Everything you need to build a Solid project, powered by [`solid-start`](https://start.solidjs.com)

## What is included in this starter template:

- vitest + vite-plugin-doctest
- biomejs
- tailwindcss v4
- cloudflare + wrangler
- solid-ui https://www.solid-ui.com/docs/introduction
- drizzle ORM with D1 + drizzle-kit + seeding (for both local and remote)
- better-auth (with magic link that mocks email sending via server console.log)

Basic navbar and sidebar layouts are also provided. User avatar, login, logout menus are setup.

## How to get started

```bash
## pull repo
git clone https://github.com/nerdfolio/faststart.git

## install dependencies
cd faststart
pnpm i

## initialize the local sqlite db
pnpm db:generate    # to generate migration files
pnpm db:migrate     # this will migrate database and make sure local D1 files exist
```

## Directory structure

```
.
```


## Pro tips
- Look at package.json to see available pnpm scripts
- With `pnpm runscript` you can run arbitrary typescript files locally. Just define a file under
the `scripts` dir and export a default async function. This function will be called with cli args parsed for it. See `scripts` dir for examples.
- See `env.example` for relevant env vars used in scripts.
- For app related env vars, use `.dev.vars` or `wrangler.jsonc` as that's how Cloudflare wrangler works.


## Cloudflare setup resources
 - https://developers.cloudflare.com/pages/framework-guides/deploy-a-solid-start-site/ (has bindings info)
 - https://ryanjc.com/blog/solidstart-cloudflare-pages/
 - https://github.com/cloudflare/workers-sdk/issues/5912
 - https://github.com/solidjs/solid-start/issues/1833
 - https://github.com/cloudflare/workers-sdk/issues/4548 (understand the hash of the local D1 filename)
 - https://github.com/cloudflare/miniflare/releases/tag/v3.20230918.0 (code to generate local D1 filename)

 ## Hope you find this useful!