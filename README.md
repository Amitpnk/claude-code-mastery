# Learn Claude Code the Right Way

Source for the GitHub Pages site for a 15-video series on structured, disciplined AI-assisted development with Claude Code, plus TaskFlow, the companion demo app used on-camera throughout the series.

Live site: https://amitpnk.github.io/claude-code-mastery/

## Structure

```
docs/index.html   # the site (GitHub Pages serves this from /docs)
docs/slides/       # HTML slide-deck viewers per episode
slides/            # source .pptx decks per episode
app/               # TaskFlow — companion demo app used on-camera (Node 20/TS/Postgres/Drizzle)
LICENSE            # MIT
```

Articles link out to Medium and videos link out to YouTube directly from `docs/index.html`.

## Companion demo app

`app/` is TaskFlow, a small team task/project tracker built with Node.js 20, TypeScript,
Express + EJS, and PostgreSQL + Drizzle ORM. It's the real, evolving codebase used to
demonstrate CLAUDE.md, Skills, SubAgents, Spec-Driven Development, Plan Mode, MCP, and
Hooks across the series. See [app/README.md](app/README.md) for run instructions and
[app/CLAUDE.md](app/CLAUDE.md) for its conventions.

## Adding materials for a new episode

1. Add the deck to `slides/`, named `NN-episode-slug.pptx` (e.g. `02-claude-code-setup.pptx`), matching the episode number/title in the `videos` array in `docs/index.html`.
2. In `docs/index.html`, update that episode's entry: set `status: "live"`, and point `youtube`, `article`, and `slides` at the real URLs (slides can link to `docs/slides/NN-episode-slug.html` in this repo).

## Enabling GitHub Pages

Repo Settings → Pages → Deploy from branch → `main` / `docs`.
