import { describe, expect, it } from "vitest";
import { platformModules } from "./navigation";
import { getCmsExportPackage, getFeaturedOpportunity } from "./studio";

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

  it("defines a multi-module platform navigation model", () => {
    expect(platformModules.length).toBeGreaterThanOrEqual(7);
    expect(platformModules.map((module) => module.href)).toEqual([
      "/",
      "/radar",
      "/evidence",
      "/strategy",
      "/campaign",
      "/rewards",
      "/export",
      "/feedback"
    ]);
    expect(platformModules.every((module) => module.task.length > 10)).toBe(true);
  });
});
