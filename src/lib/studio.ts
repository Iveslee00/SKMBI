import {
  campaignPageSections,
  campaignStrategies,
  comparisonVariants,
  demandOpportunities,
  rewardPageSections,
  type ComparisonVariant,
  type CmsExportPackage,
  type DemandOpportunity
} from "../data/mockStudio";

export type RankedOpportunity = DemandOpportunity & {
  rank: number;
  opportunityScore: number;
};

export function getFeaturedOpportunity(): DemandOpportunity {
  return demandOpportunities.reduce((best, opportunity) =>
    opportunity.businessScore > best.businessScore ? opportunity : best
  );
}

export function getRankedOpportunities(): RankedOpportunity[] {
  return demandOpportunities
    .map((opportunity) => ({
      ...opportunity,
      opportunityScore: Math.round(
        opportunity.momentum * 0.24 +
          opportunity.businessScore * 0.26 +
          opportunity.productFit * 0.18 +
          opportunity.rewardFit * 0.14 +
          opportunity.crmFit * 0.12 -
          (opportunity.executionEffort === "高" ? 6 : opportunity.executionEffort === "中" ? 3 : 0)
      )
    }))
    .sort((a, b) => b.opportunityScore - a.opportunityScore)
    .map((opportunity, index) => ({
      ...opportunity,
      rank: index + 1
    }));
}

export function getComparisonVariants(opportunityId: string): ComparisonVariant[] {
  const variants = comparisonVariants.filter((variant) => variant.opportunityId === opportunityId);
  if (variants.length > 0) {
    return variants;
  }

  return comparisonVariants.filter((variant) => variant.opportunityId === getFeaturedOpportunity().id);
}

export function getPrimaryStrategy() {
  return campaignStrategies[0];
}

export function getCmsExportPackage(type: "campaign" | "reward"): CmsExportPackage {
  const sections = type === "campaign" ? campaignPageSections : rewardPageSections;
  const title = type === "campaign" ? "小坪數省電冷房活動頁" : "顧客需求導向贈獎集合頁";
  const className = type === "campaign" ? "campaign-page" : "reward-page";

  return {
    type,
    html: [
      `<section class="${className}" data-track="${type}-hero">`,
      `  <p>${sections[0].eyebrow}</p>`,
      `  <h1>${sections[0].title}</h1>`,
      `  <p>${sections[0].body}</p>`,
      `  <button data-track="${type}-primary-cta">${sections[0].cta}</button>`,
      `</section>`
    ].join("\n"),
    css: [
      `.${className} {`,
      "  display: grid;",
      "  gap: 16px;",
      "  padding: 48px;",
      "  background: #f7f1e5;",
      "  color: #17201b;",
      "}",
      `.${className} button {`,
      "  width: fit-content;",
      "  border: 0;",
      "  padding: 12px 18px;",
      "  background: #1d4d3a;",
      "  color: white;",
      "}"
    ].join("\n"),
    js: [
      "document.querySelectorAll('[data-track]').forEach((node) => {",
      "  node.addEventListener('click', () => {",
      "    console.log('campaign-studio-track', node.getAttribute('data-track'));",
      "  });",
      "});"
    ].join("\n"),
    json: {
      type,
      title,
      sections,
      tracking: [`${type}-hero`, `${type}-primary-cta`, `${type}-reward-click`]
    }
  };
}

export function getBusinessReasoningAverage(opportunity: DemandOpportunity): number {
  const total = opportunity.reasoning.reduce((sum, item) => sum + item.score, 0);
  return Math.round(total / opportunity.reasoning.length);
}
