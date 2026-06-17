import { describe, expect, it } from "vitest";
import { campaignWorkflowSteps, getWorkflowProgress, platformModules } from "./navigation";
import {
  getCampaignProposals,
  getCmsExportPackage,
  getComparisonVariants,
  getDemoActionLabels,
  getFeaturedOpportunity,
  getOpportunityById,
  getForecastRows,
  getRankedOpportunities,
  getSavedCampaignProjects
} from "./studio";

describe("studio helpers", () => {
  it("returns the featured demand opportunity with evidence and scoring", () => {
    const opportunity = getFeaturedOpportunity();

    expect(opportunity.title).toContain("租屋");
    expect(opportunity.businessScore).toBeGreaterThanOrEqual(80);
    expect(opportunity.signals.length).toBeGreaterThanOrEqual(3);
  });

  it("builds a CMS export package with HTML, CSS, JS, and JSON", () => {
    const exportPackage = getCmsExportPackage("campaign");

    expect(exportPackage.html).toContain("<section");
    expect(exportPackage.css).toContain(".campaign-page");
    expect(exportPackage.js).toContain("data-track");
    expect(exportPackage.json.type).toBe("campaign");
  });

  it("separates global workspaces from campaign workflow steps", () => {
    expect(platformModules.map((module) => module.href)).toEqual([
      "/",
      "/create"
    ]);
    expect(platformModules.map((module) => module.shortLabel)).toEqual([
      "工作台",
      "建立策展案"
    ]);
    expect(platformModules.map((module) => module.shortLabel)).not.toContain("策展依據");
    expect(platformModules.map((module) => module.shortLabel)).not.toContain("策略工作室");
    expect(campaignWorkflowSteps.map((step) => step.shortLabel)).toEqual([
      "選需求",
      "編輯方案",
      "AI 預估",
      "選定方案",
      "產生語法",
      "成效"
    ]);
    expect(platformModules.every((module) => module.task.length > 10)).toBe(true);
  });

  it("locks future campaign flow steps while keeping completed steps clickable", () => {
    const progress = getWorkflowProgress("forecast");

    expect(progress.find((step) => step.id === "edit-options")?.state).toBe("completed");
    expect(progress.find((step) => step.id === "forecast")?.state).toBe("current");
    expect(progress.find((step) => step.id === "select-option")?.state).toBe("locked");
    expect(progress.find((step) => step.id === "edit-options")?.isClickable).toBe(true);
    expect(progress.find((step) => step.id === "select-option")?.isClickable).toBe(false);
  });

  it("keeps the workbench focused on saved campaign projects", () => {
    const projects = getSavedCampaignProjects();

    expect(projects.length).toBeGreaterThanOrEqual(3);
    expect(projects.every((project) => project.title.length > 0)).toBe(true);
    expect(projects.every((project) => project.nextAction.length > 0)).toBe(true);
    expect(projects.map((project) => project.stage)).toContain("AI 預估比較");
  });

  it("ranks opportunity rows for the marketing command center", () => {
    const ranked = getRankedOpportunities();
    const uniqueScores = new Set(ranked.map((opportunity) => opportunity.opportunityScore));

    expect(ranked[0].rank).toBe(1);
    expect(ranked[0].opportunityScore).toBeGreaterThanOrEqual(ranked[1].opportunityScore);
    expect(uniqueScores.size).toBe(ranked.length);
    expect(ranked[0].categoryGroup.length).toBeGreaterThan(0);
  });

  it("finds a specific opportunity for interactive selection", () => {
    const opportunity = getOpportunityById("family-summer-outing");

    expect(opportunity.shortTitle).toBe("親子暑假外出補給");
    expect(opportunity.businessScore).not.toBe(getFeaturedOpportunity().businessScore);
  });

  it("returns A/B strategy variants for the selected opportunity", () => {
    const variants = getComparisonVariants("small-space-cooling");

    expect(variants).toHaveLength(2);
    expect(variants.map((variant) => variant.label)).toEqual(["A", "B"]);
    expect(variants[1].projectedCtrLift).toBeGreaterThan(variants[0].projectedCtrLift);
  });

  it("keeps comparison variants suitable for side-by-side review", () => {
    const variants = getComparisonVariants("small-space-cooling");

    expect(variants.every((variant) => variant.pageAngle.length > 12)).toBe(true);
    expect(variants.every((variant) => variant.rewardAngle.length > 12)).toBe(true);
    expect(variants.every((variant) => variant.recommendation.length > 12)).toBe(true);
  });

  it("creates two editable campaign proposals before AI forecasting", () => {
    const proposals = getCampaignProposals("small-space-cooling");

    expect(proposals).toHaveLength(2);
    expect(proposals.every((proposal) => proposal.editableFields.length >= 4)).toBe(true);
    expect(proposals.every((proposal) => proposal.copyDirection.length > 12)).toBe(true);
    expect(proposals.every((proposal) => proposal.rewardIntensity.length > 8)).toBe(true);
    expect(proposals.every((proposal) => proposal.reasoning.length >= 3)).toBe(true);
  });

  it("builds demo action labels for editable proposal fields", () => {
    const [proposal] = getCampaignProposals("small-space-cooling");
    const labels = getDemoActionLabels(proposal);

    expect(labels.length).toBe(proposal.editableFields.length);
    expect(labels[0]).toMatch(/^套用.+假資料$/);
  });

  it("returns detailed forecast rows for the comparison step", () => {
    const rows = getForecastRows("small-space-cooling");

    expect(rows.length).toBeGreaterThanOrEqual(5);
    expect(rows.map((row) => row.metric)).toContain("文案吸引度");
    expect(rows.every((row) => row.variantA.length > 0 && row.variantB.length > 0)).toBe(true);
    expect(rows.some((row) => row.winner === "B")).toBe(true);
  });
});
