# Learn Claude Code the Right Way

Source for the GitHub Pages site for a 15-video series on structured, disciplined AI-assisted development with Claude Code, plus TaskFlow, the companion demo app used on-camera throughout the series.

Live site: https://amitpnk.github.io/claude-code-mastery/

## demo app

`app/` is TaskFlow, a small team task/project tracker built with Node.js 20, TypeScript,
Express + EJS, and PostgreSQL + Drizzle ORM. It's the real, evolving codebase used to
demonstrate CLAUDE.md, Skills, SubAgents, Spec-Driven Development, Plan Mode, MCP, and
Hooks across the series. See [app/README.md](app/README.md) for run instructions and
[app/CLAUDE.md](app/CLAUDE.md) for its conventions.

## Adding materials for a new episode

1. Build the slide deck as `docs/slides/NN-episode-slug.html`, matching the episode number/title in the `videos` array in `docs/index.html`. Follow the structure of an existing deck (same CSS classes, 11-slide shape ending in a "next video" closing slide) for visual consistency across the series.
2. Write the voiceover script as `docs/scripts/NN-episode-slug.md`, mirroring the deck slide-by-slide with timestamps.
3. In `docs/index.html`, update that episode's entry: set `status: "live"`, and point `youtube`, `article`, and `slides` at the real URLs (`slides` can link to `docs/slides/NN-episode-slug.html` in this repo).
