# Customer-Led Campaign Studio Prototype Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a polished React/Vercel prototype that demonstrates a customer-demand-led EC campaign workflow with mock data, campaign page generation, reward page generation, and CMS export assets.

**Architecture:** Use a Next.js App Router application with structured mock data, small pure transformation utilities, and a dashboard-style interface. Keep export generation separate from UI components so the later CMS integration can replace the mock layer without rewriting pages.

**Tech Stack:** Next.js, React, TypeScript, CSS modules/global CSS, Node test runner or Vitest depending on available scaffolding.

---

## File Structure

- `package.json`: scripts and dependencies.
- `src/app/page.tsx`: main prototype screen.
- `src/app/layout.tsx`: application shell metadata.
- `src/app/globals.css`: full visual system and responsive layout.
- `src/data/mockStudio.ts`: demand signals, strategies, generated pages, exports, and feedback mock data.
- `src/lib/studio.ts`: pure helpers for business reasoning, selected strategies, and CMS export packaging.
- `src/lib/studio.test.ts`: tests for the core data and export behavior.

## Tasks

### Task 1: Scaffold App and Test Harness

- [ ] Create or confirm a Next.js TypeScript app structure.
- [ ] Add a test script.
- [ ] Add a smoke test that imports the future studio helpers and fails before implementation.
- [ ] Run the test and confirm it fails because the helper is missing.

### Task 2: Mock Data and Export Logic

- [ ] Create mock demand opportunities for the customer demand radar.
- [ ] Create campaign strategy, campaign page, reward page, export package, and feedback mock data.
- [ ] Implement helpers that expose the featured opportunity and CMS export package.
- [ ] Run tests and confirm they pass.

### Task 3: Prototype Interface

- [ ] Build the main dashboard with six sections: demand radar, evidence, strategy studio, campaign page generator, reward page generator, and feedback loop.
- [ ] Use a serious internal-product visual direction with strong hierarchy and designed previews.
- [ ] Make the layout responsive.

### Task 4: Verification

- [ ] Run tests.
- [ ] Run lint or build checks.
- [ ] Start the local site.
- [ ] Verify the UI in the browser at desktop and mobile widths.
- [ ] Commit the implementation.

