# Customer-Led Campaign Studio Design

## Purpose

Build a concept website for a customer-led EC campaign curation workflow. The product should help an EC design leader show a new operating model for 2027: every curated campaign page and reward collection page should be created with clear consumer demand evidence, business reasoning, designed output, and performance feedback.

The first version is a polished, interactive skeleton using mock data. It should make the process feel real without requiring live GA4, CMS, Google Search, member, or product database integrations.

## Core Product Claim

Every EC campaign should be able to answer:

1. Why should this campaign happen now?
2. Which consumer need does it serve?
3. Why is it worth business investment?
4. How will performance return to improve the next campaign?

The platform should shift the team away from habit-led planning such as "summer is here, so we make an air conditioner campaign" and toward demand-led planning such as "small-space renters are looking for low-power, no-installation cooling solutions."

## Primary Users

### EC Operations and Campaign Planners

They use the platform to understand demand signals, select campaign opportunities, review AI-generated strategy, and produce CMS-ready campaign page assets.

### Marketing and CRM Teams

They use the platform to translate customer needs into messaging angles for LINE, EDM, social posts, and member segmentation.

### EC Design Leader

The first version should also work as a vision prototype for communicating a 2027 product direction and a more evidence-based campaign workflow.

## MVP Scope

The MVP includes both campaign page generation and reward collection page generation, but at concept-skeleton depth. It should show the full loop:

1. Detect customer demand signals.
2. Turn signals into campaign opportunities.
3. Generate campaign strategy.
4. Produce a designed campaign page or reward collection page.
5. Export CMS-ready HTML, CSS, JS, and JSON.
6. Show mock performance feedback for future iteration.

The MVP will use mock data for all analytics, search trends, customer behavior, product, reward, and performance information.

## Product Structure

### 1. Customer Demand Radar

This is the landing workspace. It should show customer demand opportunities instead of campaign seasons or product categories.

Example demand cards:

- Small-space renters are looking for energy-saving cooling solutions.
- Families preparing for summer outings need sunscreen and hydration bundles.
- New employees moving into rentals need one-stop home starter kits.
- High-temperature commuters are looking for portable cooling and sweat-proof products.

Each card should include:

- Demand summary.
- Signal sources.
- Heat or momentum score.
- Related categories.
- Business opportunity score.
- Recommended output type: campaign page, reward collection page, or content guide.

### 2. Curation Evidence Page

This is the most important page in the product. It explains why a campaign should exist.

It should include:

- Customer need summary.
- Signal source distribution.
- Popular keywords and phrases.
- Related products and categories.
- Reward opportunities.
- Business reasoning score.
- Risks, constraints, and caveats.
- AI recommendation: proceed, revise, or hold.

The tone should make the evidence clear to cross-functional stakeholders. The page should not feel like an analytics dump; it should feel like a designed decision brief.

The business reasoning score should be presented as a composite view, not a black-box number. For the mock version, it should consider:

- Consumer demand strength.
- Search or discussion momentum.
- Product and category fit.
- Reward fit.
- Inventory or supply readiness.
- Margin or commercial priority.
- CRM and communication usefulness.
- Brand and seasonal relevance.
- Execution risk.

### 3. Strategy Studio

This page turns one demand opportunity into 2-3 campaign strategies.

Each strategy should include:

- Campaign proposition.
- Target audience.
- Product bundle logic.
- Reward logic.
- Page narrative.
- LINE, EDM, and social messaging angles.
- Expected performance hypothesis.
- Confidence score and reasoning.

### 4. Campaign Page Generator

This page turns a selected strategy into a polished campaign page draft.

The generated draft should include:

- Hero section.
- Customer problem or scenario section.
- Product recommendation blocks.
- Reward section.
- Campaign rules.
- Calls to action.
- SEO title and description.
- Social sharing copy.
- Tracking parameter suggestions.

Exports should include:

- HTML.
- CSS.
- JS.
- JSON structure.
- Copy list.
- Image requirement list.
- Tracking parameter list.

### 5. Reward Collection Page Generator

This page creates a reward collection page organized by customer needs instead of only listing gifts.

Possible structures:

- Browse rewards by life scenario.
- Browse rewards by spend threshold.
- Browse rewards by category.
- Browse rewards by member need or segment.

Exports should include the same asset types as the campaign page generator: HTML, CSS, JS, JSON, copy list, image requirements, and tracking suggestions.

### 6. Performance Feedback Loop

This page uses mock data to show what happens after launch.

It should answer:

- Which demand hypothesis was validated?
- Which page section performed well?
- Which reward drove clicks or conversion?
- Which product bundles showed traction?
- What should the next campaign continue, revise, or stop?

The feedback should loop back into the demand radar and strategy studio.

## Design Direction

The website should feel like a serious internal product for a leading Taiwanese retail company, not a marketing landing page. It should be polished, calm, credible, and designed, with strong information hierarchy.

Recommended interface qualities:

- Dense but readable workspace.
- Clear evidence cards and decision summaries.
- Beautiful generated page previews.
- Strong distinction between evidence, AI recommendation, and editable output.
- Minimal decorative visuals.
- Professional color palette that avoids a one-note hue family.
- Responsive layouts for desktop-first work, with usable tablet and mobile views.

The first screen should immediately communicate the product claim and show the working platform, not a generic hero page.

## Technical Direction

Use React on Vercel, preferably Next.js App Router.

Architecture principles from Vercel React best practices:

- Prefer server-rendered routes for static mock data and non-interactive page sections.
- Use client components only for interactive controls, tabs, filters, previews, and export panels.
- Keep mock data in structured modules so it can later be replaced by real service calls.
- Create a service layer for future integrations such as GA4, CMS, Google Search, product data, and CRM.
- Avoid heavy client bundles; dynamically load expensive preview or editor areas if needed.
- Keep HTML, CSS, JS, and JSON export generation isolated from UI components.

## Mock Data Model

The first version should include mock entities for:

- Demand signals.
- Signal sources.
- Keywords.
- Products.
- Categories.
- Rewards.
- Campaign strategies.
- Generated campaign page sections.
- Generated reward page sections.
- CMS export package.
- Performance feedback.

## CMS Export Assumption

The company's CMS can accept HTML, CSS, and JS. The MVP should generate exportable page assets and structured JSON, but should not directly publish to CMS.

The export center should clearly separate:

- Preview.
- HTML.
- CSS.
- JS.
- JSON.
- Copy.
- Image requirements.
- Tracking parameters.

## Out of Scope for MVP

- Live GA4 or Adobe Analytics integration.
- Live Google Search or Google Trends integration.
- Real CMS publishing.
- Real product database integration.
- Real CRM or member segmentation integration.
- Authentication and enterprise permissions.
- Approval workflow.

These should be represented as future roadmap items, not implemented in the first skeleton.

## Future Requirements

To turn the concept into a production platform, the team will need:

- Definition of customer demand signals.
- Real analytics export fields.
- Product data fields and inventory rules.
- Reward campaign data format.
- CMS HTML, CSS, and JS constraints.
- JSON import format if available.
- Brand and visual design rules for generated campaign pages.
- Tracking event standards.
- Governance for AI-generated recommendations.
- Human review and approval flow.

## Success Criteria for the Skeleton

The skeleton is successful if a stakeholder can understand the new workflow within a few minutes:

- Campaigns start from customer demand, not internal habit.
- Evidence and business reasoning are visible before page generation.
- The platform can generate both campaign pages and reward collection pages.
- CMS export is practical through HTML, CSS, JS, and JSON.
- Performance feedback closes the loop for future curation.
