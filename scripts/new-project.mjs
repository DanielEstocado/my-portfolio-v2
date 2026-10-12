#!/usr/bin/env node
// Starts a real project from this template: renames the app and clears the template's own screens
// (the showcase, which the home screen renders until then, and the guide at /system/about). Run it
// once, right after copying the template:  npm run new-project -- --name "My App"
//
// Two ways to clear them. Both swap the home screen for a blank one.
//   hard (the default)  deletes the screens, their routes and the template wording in the docs
//   --soft              keeps the files and only switches their routes off, so they stay as a live
//                       reference. Set SHOW_SYSTEM_SCREENS back to true in routes.config.ts and they are
//                       at /system and /system/about again
//
// It only plans changes until you pass --yes, so the first run is always a dry run.
//   --name "My App"   the project name (required)
//   --tagline "..."   the line under the name in the header (default: none)
//   --soft            keep the files, switch the screens off
//   --yes             actually apply the plan
//   --force           apply even if git has uncommitted changes
//   --remove-self     also delete this script, its npm script and the /new-project command
import { existsSync, readdirSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { execSync } from "node:child_process";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const args = process.argv.slice(2);
const ROUTES_FILE = "src/routes/routes.config.ts";

// Whether a flag such as --yes was passed.
function hasFlag(name) {
  return args.includes(`--${name}`);
}

// The value after a flag such as --name, or undefined.
function flagValue(name) {
  const index = args.indexOf(`--${name}`);
  return index >= 0 && args[index + 1] && !args[index + 1].startsWith("--") ? args[index + 1] : undefined;
}

// Reads a project file as text, with Windows line endings turned into plain ones.
function read(path) {
  return readFileSync(join(ROOT, path), "utf8").replace(/\r\n/g, "\n");
}

// "My App" becomes "my-app", the form a package name needs.
function slugify(name) {
  return name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");
}

// Changes one file with a function that returns the new text, noting when the text it expected is gone.
function edit(path, change, warnings) {
  const before = read(path);
  const after = change(before);
  if (after === before) warnings.push(`${path}: nothing to change, it may already be edited`);
  else writeFileSync(join(ROOT, path), after);
}

// The short README the new project starts with.
function readme(name) {
  return `# ${name}

React 19 + Vite + TypeScript + Tailwind v4 + shadcn/ui.

\`\`\`bash
npm install
cp .env.example .env   # set VITE_API_URL
npm run dev
\`\`\`

| Script | What it does |
| --- | --- |
| \`npm run dev\` | Start the dev server |
| \`npm run build\` | Type-check and build for production |
| \`npm run lint\` | ESLint |

The folder layout, typography and spacing scales, and house rules are in [CLAUDE.md](CLAUDE.md).
`;
}

// The blank home screen that replaces the one showing the showcase.
const BLANK_HOME = `import { CustomPageHeader } from "@/components";

// The app's own home screen, a blank starting point. Replace it with the first real screen.
const HomeScreen = () => {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <CustomPageHeader />

      <section className="page-container flex min-h-[calc(100svh-var(--page-header-height))] flex-col items-center justify-center text-center">
        <h1 className="title text-display text-balance">Home</h1>
        <p className="subtitle mt-md max-w-xl text-body-lg text-muted-foreground">
          This is your app's home screen. Replace it with the first real
          screen, it lives in src/screens/home.
        </p>
      </section>
    </main>
  );
};

export default HomeScreen;
`;

// Removes every block between a pair of marker comments, in CLAUDE.md (html comments) or the routes file (line comments).
function stripMarkers(text, kind) {
  const html = new RegExp(`[ \\t]*<!-- ${kind} -->[\\s\\S]*?<!-- /${kind} -->\\n?`, "g");
  return text.replace(html, "");
}

// Where the template still shows through after a hard reset, listed so they can be cleaned by hand or by /new-project.
const LEFTOVERS = [/\/system/i, /AboutScreen/, /ShowcaseScreen/, /component library/i, /jayreh/i];
const DOC_LEFTOVERS = [...LEFTOVERS, /\btemplate\b/i];

// Every line in the docs and source that still mentions the template.
function findLeftovers() {
  const files = ["CLAUDE.md", "README.md", "index.html", "package.json"];
  const walk = (dir) =>
    readdirSync(join(ROOT, dir), { withFileTypes: true }).flatMap((entry) => {
      const path = `${dir}/${entry.name}`;
      if (entry.isDirectory()) return entry.name === "ui" ? [] : walk(path);
      return /\.(ts|tsx)$/.test(entry.name) ? [path] : [];
    });
  const found = [];
  for (const file of [...files, ...walk("src")]) {
    const patterns = files.includes(file) ? DOC_LEFTOVERS : LEFTOVERS;
    read(file).split("\n").forEach((line, i) => {
      if (patterns.some((pattern) => pattern.test(line))) found.push(`${file}:${i + 1}  ${line.trim().slice(0, 110)}`);
    });
  }
  return found;
}

// The steps both resets share: the name goes into the header, the page title, the package and the docs.
function commonSteps(name, tagline, soft, warnings) {
  const slug = slugify(name);
  return [
    { label: `Put "${name}" in the header (src/components/CustomPageHeader.tsx)`, run: () => edit("src/components/CustomPageHeader.tsx", (s) => s.replace(/<p className="title text-h3">[^<]*<\/p>/, () => `<p className="title text-h3">${name}</p>`).replace(/\n\s*<p className="subtitle text-caption text-muted-foreground">\s*[^<]*?\s*<\/p>/, () => (tagline ? `\n          <p className="subtitle text-caption text-muted-foreground">${tagline}</p>` : "")), warnings) },
    { label: `Set the page title in index.html to "${name}"`, run: () => edit("index.html", (s) => s.replace(/<title>[^<]*<\/title>/, `<title>${name}</title>`), warnings) },
    { label: `Rename the package to "${slug}" in package.json`, run: () => edit("package.json", (s) => s.replace(/"name": "[^"]*"/, `"name": "${slug}"`), warnings) },
    { label: "Replace README.md with a short one for the new project", run: () => writeFileSync(join(ROOT, "README.md"), readme(name)) },
    {
      label: soft
        ? "Update CLAUDE.md: the title, and remove the text about the new-project command"
        : "Update CLAUDE.md: the title, and remove all the template-only and system screen text",
      run: () => edit("CLAUDE.md", (s) => {
        s = s.replace(/^# .*: Conventions/m, `# ${name}: Conventions`);
        s = stripMarkers(s, "template-only");
        if (!soft) s = stripMarkers(s, "system-screens");
        return s.replace(/\n{3,}/g, "\n\n");
      }, warnings),
    },
  ];
}

// Builds the list of things to do, each with a label for the plan and the function that does it.
function buildPlan(name, tagline, soft, warnings) {
  const plan = [
    { label: "Replace src/screens/home/HomeScreen.tsx (it shows the showcase) with a blank home screen", run: () => writeFileSync(join(ROOT, "src/screens/home/HomeScreen.tsx"), BLANK_HOME) },
  ];
  if (soft) {
    plan.push({ label: `Switch the system screens off in ${ROUTES_FILE} (SHOW_SYSTEM_SCREENS = false), /system and /system/about are then gone`, run: () => edit(ROUTES_FILE, (s) => s.replace("const SHOW_SYSTEM_SCREENS = true;", "const SHOW_SYSTEM_SCREENS = false;"), warnings) });
  } else {
    plan.push(
      { label: "Delete src/screens/system/showcase/ (the hero and the component library)", run: () => rmSync(join(ROOT, "src/screens/system/showcase"), { recursive: true, force: true }) },
      { label: "Delete src/screens/system/about/ (the template guide)", run: () => rmSync(join(ROOT, "src/screens/system/about"), { recursive: true, force: true }) },
      { label: `Remove the system routes from ${ROUTES_FILE}`, run: () => edit(ROUTES_FILE, (s) => s.replace(/[ \t]*\/\/ system-routes:start[\s\S]*?\/\/ system-routes:end\n?/g, "").replace(/\n{3,}/g, "\n\n"), warnings) },
    );
  }
  plan.push(...commonSteps(name, tagline, soft, warnings));
  if (hasFlag("remove-self")) {
    plan.push({
      label: "Remove this script, the npm script and the /new-project command",
      run: () => {
        rmSync(join(ROOT, "scripts/new-project.mjs"), { force: true });
        if (existsSync(join(ROOT, "scripts")) && readdirSync(join(ROOT, "scripts")).length === 0) rmSync(join(ROOT, "scripts"), { recursive: true });
        rmSync(join(ROOT, ".claude/commands/new-project.md"), { force: true });
        const commands = join(ROOT, ".claude/commands");
        if (existsSync(commands) && readdirSync(commands).length === 0) rmSync(commands, { recursive: true });
        edit("package.json", (s) => s.replace(/\n\s*"new-project": "[^"]*",?/, "").replace(/,(\s*\})/g, "$1"), warnings);
      },
    });
  }
  return plan;
}

// Whether git has uncommitted changes, which a cleanup should not be mixed with.
function gitIsDirty() {
  try {
    return execSync("git status --porcelain", { cwd: ROOT, encoding: "utf8" }).trim().length > 0;
  } catch {
    return false;
  }
}

// Plans, and with --yes applies, the reset.
function main() {
  const name = flagValue("name");
  const tagline = flagValue("tagline") || "";
  const soft = hasFlag("soft");
  const apply = hasFlag("yes");

  if (!name) {
    console.error('Give the project a name:  npm run new-project -- --name "My App"');
    process.exit(1);
  }
  if (/[<>{}]/.test(name) || !slugify(name)) {
    console.error("The name needs at least one letter or digit and can't contain < > { or }.");
    process.exit(1);
  }
  if (hasFlag("hard") && soft) {
    console.error("Pick one: --soft or --hard (the default).");
    process.exit(1);
  }
  if (!existsSync(join(ROOT, "src/screens/system/showcase"))) {
    console.error("The system screens are already gone, this project has been reset before. Nothing to do.");
    process.exit(1);
  }
  if (soft && !read(ROUTES_FILE).includes("const SHOW_SYSTEM_SCREENS = true;")) {
    console.error("The system screens are already switched off. Use the hard reset to delete them, or set SHOW_SYSTEM_SCREENS back to true.");
    process.exit(1);
  }
  if (apply && gitIsDirty() && !hasFlag("force")) {
    console.error("Git has uncommitted changes. Commit or stash them first, or pass --force.");
    process.exit(1);
  }

  const warnings = [];
  const plan = buildPlan(name, tagline, soft, warnings);
  console.log(`${apply ? "Applying" : "Plan (nothing is changed without --yes)"}, ${soft ? "soft" : "hard"} reset for "${name}":\n`);
  plan.forEach((step, i) => console.log(`  ${i + 1}. ${step.label}`));
  if (!apply) {
    console.log("\nRun again with --yes to apply it.");
    return;
  }

  plan.forEach((step) => step.run());
  console.log("\nDone.");
  warnings.forEach((warning) => console.log(`  warning: ${warning}`));

  if (!soft) {
    const leftovers = findLeftovers();
    if (leftovers.length) {
      console.log(`\nStill mentions the template (${leftovers.length}), review these:`);
      leftovers.forEach((line) => console.log(`  ${line}`));
    }
  } else {
    console.log("\nThe system screens are still in src/screens/system, switched off. To bring them back set SHOW_SYSTEM_SCREENS to true in " + ROUTES_FILE + ".");
  }
  console.log("\nNext: npm run build && npm run lint, then look at it in the browser.");
}

main();
