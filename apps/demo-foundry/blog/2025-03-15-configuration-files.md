---
title: "Why We Stopped Writing Configuration Files"
authors: [elena]
tags: [philosophy, manifests]
---

We have been building multi-package workspaces for the better part of a decade. And for the better part of a decade, we have been drowning in configuration files that nobody maintains.

<!-- truncate -->

## The Drift Nobody Notices

Every workspace starts clean. One package, one Warden config, one Alloy settings file. Then the second package appears, and someone copies the config from the first. By month six, you have twelve packages, three different Warden setups, two conflicting Alloy configurations, and a Blueprint that somebody copy-pasted from the core package and never updated.

We call this configuration drift. It is the slow, silent divergence of build settings across a codebase. Nobody notices until a new hire asks why the `api` package allows implicit `any` while the `web` package does not.

## What Twelve Config Files Look Like

Here is what a typical workspace looked like before Foundry. Every package had its own set of configuration files:

```text title="Before: 12 config files per workspace"
my-workspace/
  .wardenrc.grain
  alloy.config.grain
  smelter.config.grain
  blueprint.grain
  packages/
    core/
      .wardenrc.grain
      alloy.config.grain
      smelter.config.grain
    api/
      .wardenrc.grain
      alloy.config.grain
      smelter.config.grain
    web/
      .wardenrc.grain
      alloy.config.grain
      smelter.config.grain
```

Twelve files. Four packages. And every single one of them could drift independently.

## What One Manifest Looks Like

Here is the same workspace described in a single `.grain` manifest:

```text title="After: 1 manifest"
# project.grain
workspace "my-workspace" {
  lang    = "alloy"
  warden  = ["strict", "conventions"]
  smelter = "standard"

  packages {
    core { type = "library" }
    api  { type = "service", depends = ["core"] }
    web  { type = "app", depends = ["core"] }
  }
}
```

One file. Same workspace. Every package inherits the same Warden rules, the same Alloy settings, and the same Smelter configuration. If you need to override something for a specific package, you do it inline:

```diff title="project.grain — per-package override"
  packages {
    core { type = "library" }
-   api  { type = "service", depends = ["core"] }
+   api  { type = "service", depends = ["core"], warden = ["strict", "conventions", "api-safety"] }
    web  { type = "app", depends = ["core"] }
  }
```

The override is explicit. It lives next to the thing it modifies. There is no hidden file in a nested directory that silently changes behavior.

:::tip
Run `foundry ignite --dry-run` to see what Foundry would generate without writing any files. This is the fastest way to verify your manifest before committing.
:::

## The Thesis

Intent should be declarative. You should describe what your workspace looks like — languages, dependencies, rules, targets — and the toolchain should figure out the rest.

Configuration files are implementation details. They are the byproduct of a toolchain that cannot infer what you mean from what you wrote. Every time you hand-edit a Warden config, you are doing work that a compiler could do for you.

That is why we built Foundry. Not because we wanted another CLI. Because we wanted to stop writing the same twelve files on every project and start describing what we actually meant.

## What Changed for Us

Since switching our internal workspaces to Foundry manifests:

- **Config-related bugs dropped to zero.** No more "works on my machine" caused by a stale Alloy config in a nested package.
- **Onboarding time fell from two hours to fifteen minutes.** New engineers read one manifest instead of hunting through twelve config files.
- **Warden rule consistency went from 74% to 100%.** Every package runs the same rules. No exceptions unless the manifest says so.

The forge does not care about your opinions. It cares about your manifest. Write it once, and everything downstream stays in line.

## Try It

```bash
spark install foundry
foundry ignite
```

Two commands. One manifest. Zero configuration files. Read the [Getting Started](/docs/getting-started/) guide to see how it works from scratch.
