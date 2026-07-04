# Learn Claude Code the Right Way

Source for the GitHub Pages site for a 15-video series on structured, disciplined AI-assisted development with Claude Code.

Live site: https://amitpnk.github.io/claude-code-mastery/

## Structure

```
index.html   # the site (GitHub Pages serves this from the repo root)
LICENSE      # MIT
slides/      # per-episode slide decks (.pptx), added as each episode ships
```

Articles link out to Medium and videos link out to YouTube directly from `index.html` — only slide decks live in this repo.

## Adding materials for a new episode

1. Add the deck to `slides/`, named `NN-episode-slug.pptx` (e.g. `02-claude-code-setup.pptx`), matching the episode number/title in the `videos` array in `index.html`.
2. In `index.html`, update that episode's entry: set `status: "live"`, and point `youtube`, `article`, and `slides` at the real URLs (slides can link to the raw file in this repo).

## Enabling GitHub Pages

Repo Settings → Pages → Deploy from branch → `main` / root.
