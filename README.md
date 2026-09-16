# Tovo

Tovo is a TV operating system concept — think Roku, Google TV, or Fire TV, but with
its own dark, cinematic identity built around a signature amber accent and an
original owl mark.

This repository contains **the frontend only**. There is no backend, no
authentication, no real streaming integrations, and no API layer — every list,
title, and setting on screen is mock data defined under `src/data/`. The goal
is a frontend that's structured cleanly enough for another team to wire up
real data later without reworking the UI.

## Stack

- React 19 + TypeScript
- Vite 8
- Tailwind CSS v4 (CSS-first theme, see `src/index.css`)
- React Router 7
- Framer Motion for transitions

## Getting started

```bash
npm install
npm run dev
```

Open the printed local URL. The app is designed to be navigated with a
keyboard as a D-pad stand-in:

- **Arrow keys** move focus spatially between nav items, cards, buttons, and
  settings controls.
- **Enter** / **Space** activates whatever is focused.
- **Backspace** / **Escape** goes back (e.g. out of a title detail page).

Mouse hover also moves focus, for convenience when reviewing in a browser.

## Structure

```
src/
  components/
    layout/     top nav, page shell, route transitions
    media/      poster art, content cards, rows, grids, hero
    apps/       app-launcher tiles and row
    search/     on-screen keyboard
    settings/   settings sidebar + row controls
    boot/       boot/loading screen
    ui/         buttons, badges, progress bars, filters
    icons/      the Tovo owl mark
  data/         mock content, apps, settings, library — swap for real APIs later
  hooks/        useFocusable — the D-pad focus hook
  lib/          focusStore — spatial navigation engine
  pages/        one file per route
```

### Spatial navigation

`src/lib/focusStore.ts` implements geometry-based spatial navigation: every
focusable element registers its DOM ref, and arrow-key presses find the
nearest registered element in that direction using bounding-box geometry.
This is what lets the persistent top nav, horizontal content rows, and
settings grids all compose into one consistent D-pad experience without
manual wiring between sections. `src/hooks/useFocusable.ts` is the React-side
hook every focusable component uses.

### Resolution scaling

The root font-size scales linearly with viewport width
(`clamp(10px, 0.8333vw, 34px)` in `src/index.css`), so the same rem-based
layout reads correctly at 1280×720, 1920×1080, and 3840×2160 without separate
breakpoint variants for every component.

## Mock data

All content lives in `src/data/`: invented movies and shows (`content.ts`),
a mock app grid (`apps.ts`), library/continue-watching state, and settings
categories (`settings.ts`). Poster art is generated procedurally
(`components/media/PosterArt.tsx`) rather than loaded from images, so the app
runs fully offline with no external assets.
