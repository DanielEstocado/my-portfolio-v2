---
description: Reset this template for a real project, a hard reset deletes its own screens, --soft only switches them off
argument-hint: <project name> [--soft] [tagline]
---

Start a real project from this template. The project name is the first part of `$ARGUMENTS`. A
`--soft` in it means the soft reset, anything left over is an optional tagline for the header. If
there is no name, ask for one and stop. If the user did not say soft or hard, ask which they want:
hard (the default) deletes the template's own screens (`screens/system/showcase`,
`screens/system/about`) and their routes, soft keeps the files and only switches the routes off so the
showcase stays as a live reference. Either way the script replaces `screens/home/HomeScreen.tsx`
(which renders the showcase) with a blank home, do not edit `screens/home` yourself.

1. Run `npm run new-project -- --name "<name>"` first (add `--soft` for a soft reset), without
   `--yes`. It only prints a plan. Show the plan to the user and wait for a clear yes before going
   on, because the next step changes or deletes files. If git has uncommitted changes, say so and
   suggest committing first.
2. Apply it with the same command plus `--yes` (and `--tagline "<tagline>"` when there is one).
   Add `--remove-self` unless the user wants to keep the script and this command, a project is only
   started once.
3. Hard reset only: the script prints every place that still mentions the template. Go through
   that list and fix what is wrong for a real project: `CLAUDE.md` (the opening description, the
   Testing and Theme sections) and the README. Leave the storage keys and the plain code comments
   alone. Soft reset: nothing to clean up, the template wording is still true, so skip this step.
   Follow `CLAUDE.md`'s own rules either way: one short `//` comment above each function, no em
   dashes.
4. Check `src/screens/home/HomeScreen.tsx` is a sensible start for the app and that nothing imports
   a file that was deleted.
5. Run `npm run build` and `npm run lint`, both must pass clean. Then start the dev server, open
   `/` at desktop and phone width and check the console for errors. After either reset `/` goes to
   `/home`, now the blank home screen, and `/system` and `/system/about` are 404s. A soft reset
   brings them back once `SHOW_SYSTEM_SCREENS` is set to `true`.
6. Report what changed and what is left for the user to decide. Do not commit or push unless
   asked, and never add a co-author or "Generated with" line.
