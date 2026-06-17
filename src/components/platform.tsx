import Link from "next/link";
import { DemandSelectionWorkbench } from "./demand-selection-workbench";
import { ProposalEditor } from "./proposal-editor";
import { SidebarShell } from "./sidebar-shell";
import {
  campaignPageSections,
  campaignStrategies,
  demandOpportunities,
  feedbackItems,
  rewardPageSections,
  type CampaignProposal,
  type DemandOpportunity,
  type SavedCampaignProject
} from "../data/mockStudio";
import { getWorkflowProgress, platformModules } from "../lib/navigation";
import {
  getBusinessReasoningAverage,
  getCampaignProposals,
  getCmsExportPackage,
  getComparisonVariants,
  getFeaturedOpportunity,
  getForecastRows,
  getPrimaryStrategy,
  getRankedOpportunities,
  getSavedCampaignProjects
} from "../lib/studio";

export function PlatformShell({
  active,
  eyebrow,
  title,
  description,
  showWorkflow = false,
  activeWorkflowStep,
  children
}: {
  active: string;
  eyebrow: string;
  title: string;
  description: string;
  showWorkflow?: boolean;
  activeWorkflowStep?: string;
  children: React.ReactNode;
}) {
  return (
    <SidebarShell>
      <aside className="sidebar" aria-label="Platform navigation">
        <div className="brand-block">
          <span>CL</span>
          <div>
            <strong>Campaign Studio</strong>
            <small>Customer-led EC</small>
          </div>
        </div>
        <nav className="module-nav">
          <p className="nav-section-label">Workspaces</p>
          {platformModules.map((module) => (
            <Link
              aria-current={active === module.href ? "page" : undefined}
              className={active === module.href ? "active" : ""}
              href={module.href}
              key={module.href}
            >
              <i aria-hidden="true" className={`nav-icon ${module.icon}`} />
              <span>{module.shortLabel}</span>
              <small>{module.status}</small>
            </Link>
          ))}
        </nav>
      </aside>

      <section className="workspace">
        <header className="workspace-header">
          <div>
            <p className="eyebrow">{eyebrow}</p>
            <h1>{title}</h1>
            <p>{description}</p>
          </div>
          <div className="operator-card">
            <span>2027</span>
            <small>EC Design Goal</small>
          </div>
        </header>
        {showWorkflow ? (
          <section className="case-workflow" aria-label="Campaign workflow">
            <div>
              <p className="eyebrow">Campaign Flow</p>
              <strong>建立策展案</strong>
            </div>
            <nav>
              {getWorkflowProgress(activeWorkflowStep).map((step) =>
                step.isClickable ? (
                  <Link className={step.state} href={step.href} key={step.id}>
                    <span>{step.shortLabel}</span>
                    <small>{step.task}</small>
                  </Link>
                ) : (
                  <span aria-current={step.state === "current" ? "step" : undefined} className={step.state} key={step.id}>
                    <span>{step.shortLabel}</span>
                    <small>{step.task}</small>
                  </span>
                )
              )}
            </nav>
          </section>
        ) : null}
        {children}
      </section>
    </SidebarShell>
  );
}

export function DashboardPage() {
  const projects = getSavedCampaignProjects();

  return (
    <PlatformShell
      active="/"
      eyebrow="Command Center"
      title="工作台"
      description="只列出目前已儲存的策展案，方便回到正在進行的工作。"
    >
      <SavedProjectsTable projects={projects} />
    </PlatformShell>
  );
}

export function CreateCampaignPage() {
  const ranked = getRankedOpportunities();
  const categories = ["全部", ...Array.from(new Set(ranked.map((opportunity) => opportunity.categoryGroup)))];
  const categoryCounts = categories.map((category) =>
    category === "全部" ? ranked.length : ranked.filter((opportunity) => opportunity.categoryGroup === category).length
  );

  return (
    <PlatformShell
      active="/create"
      eyebrow="Create Campaign"
      title="建立策展案"
      description="Step 1：看完需求排名、選擇理由與數據，再決定要用哪個議題開始。"
      showWorkflow
      activeWorkflowStep="select-demand"
    >
      <DemandSelectionWorkbench ranked={ranked} categories={categories} categoryCounts={categoryCounts} />
    </PlatformShell>
  );
}

export function CampaignOptionsPage() {
  const opportunity = getFeaturedOpportunity();
  const proposals = getCampaignProposals(opportunity.id);

  return (
    <PlatformShell
      active="/create"
      eyebrow="Create Campaign"
      title="產生並編輯策展方案"
      description="Step 2：AI 先針對選定議題產生兩個方案，使用者可調整文案、商品與贈獎力度後再比較。"
      showWorkflow
      activeWorkflowStep="edit-options"
    >
      <section className="module-card step-context">
        <div>
          <p className="eyebrow">Selected Demand</p>
          <h2>{opportunity.shortTitle}</h2>
          <p className="lead">{opportunity.summary}</p>
        </div>
        <div className="action-row">
          <Link href="/create">回到選需求</Link>
          <Link href="/create/compare">進行 AI 預估比較</Link>
        </div>
      </section>

      <section className="proposal-grid" aria-label="Campaign proposals">
        {proposals.map((proposal) => (
          <ProposalCard key={proposal.label} proposal={proposal} />
        ))}
      </section>
    </PlatformShell>
  );
}

export function ForecastComparePage() {
  const opportunity = getFeaturedOpportunity();
  const variants = getComparisonVariants(opportunity.id);
  const rows = getForecastRows(opportunity.id);

  return (
    <PlatformShell
      active="/create"
      eyebrow="AI Forecast"
      title="AI 預估比較"
      description="Step 3：比較兩個方案在文案、活動力度、商品組合與預估成效上的差異，必要時回上一頁調整。"
      showWorkflow
      activeWorkflowStep="forecast"
    >
      <div className="forecast-layout">
        <section className="module-card forecast-summary">
          <div className="module-card-head">
            <div>
              <p className="eyebrow">Before Launch</p>
              <h2>先預估，再決定要不要改</h2>
            </div>
            <Score value={86} label="建議分" />
          </div>
          <p className="lead">這頁的目的不是上線後 A/B test，而是上線前先用 AI 評估哪個方案更有機會打中顧客需求。使用者可以回到上一頁修改文案或贈獎，再重新比較。</p>
          <div className="action-row">
            <Link href="/create/options">回去編輯方案</Link>
            <Link href="/create/select">選定 A/B 方案</Link>
          </div>
        </section>

        <ForecastCharts />

        <section className="forecast-variant-grid" id="select-option">
          {variants.map((variant) => (
            <article className="module-card" key={variant.label}>
              <span className="variant-label">{variant.label}</span>
              <h2>{variant.name}</h2>
              <p className="lead">{variant.pageAngle}</p>
              <div className="metric-strip">
                <Metric label="CTR" value={`+${variant.projectedCtrLift}%`} />
                <Metric label="CVR" value={`+${variant.projectedCvrLift}%`} />
                <Metric label="CRM" value={variant.crmValue} />
                <Metric label="難度" value={variant.executionEffort} />
              </div>
              <strong className="forecast-callout">{variant.recommendation}</strong>
              <div className="action-row">
                <Link href="/create/select">選擇 {variant.label} 方案</Link>
              </div>
            </article>
          ))}
        </section>

        <section className="module-card analysis-panel">
          <p className="eyebrow">Analysis Matrix</p>
          <h2>比較項目</h2>
          <div className="analysis-grid">
            {rows.map((row) => (
              <article key={row.metric}>
                <header>
                  <strong>{row.metric}</strong>
                  <span>{row.winner === "Tie" ? "持平" : `${row.winner} 勝`}</span>
                </header>
                <div>
                  <p>A：{row.variantA}</p>
                  <p>B：{row.variantB}</p>
                </div>
                <small>{row.insight}</small>
              </article>
            ))}
          </div>
        </section>
      </div>
    </PlatformShell>
  );
}

export function SelectOptionPage() {
  const opportunity = getFeaturedOpportunity();
  const variants = getComparisonVariants(opportunity.id);

  return (
    <PlatformShell
      active="/create"
      eyebrow="Select Option"
      title="選定方案"
      description="Step 4：預估完成後，選定要進入 CMS 語法產生的版本。"
      showWorkflow
      activeWorkflowStep="select-option"
    >
      <section className="module-card step-context">
        <div>
          <p className="eyebrow">Decision</p>
          <h2>建議選 B，但仍可切換 A/B</h2>
          <p className="lead">B 版本在需求敘事、活動力度與 CRM 價值上較高；A 可作為基準版本保留。</p>
        </div>
        <div className="action-row">
          <Link href="/create/compare">回到 AI 預估</Link>
          <Link href="/create/generate">確認並產生語法</Link>
        </div>
      </section>
      <section className="selection-grid">
        {variants.map((variant) => (
          <article className={`module-card selection-card ${variant.label === "B" ? "selected" : ""}`} key={variant.label}>
            <span className="variant-label">{variant.label}</span>
            <h2>{variant.name}</h2>
            <p className="lead">{variant.pageAngle}</p>
            <div className="metric-strip">
              <Metric label="CTR" value={`+${variant.projectedCtrLift}%`} />
              <Metric label="CVR" value={`+${variant.projectedCvrLift}%`} />
              <Metric label="CRM" value={variant.crmValue} />
              <Metric label="成本" value={variant.marginImpact} />
            </div>
            <strong>{variant.label === "B" ? "目前選定" : "保留為備案"}</strong>
          </article>
        ))}
      </section>
    </PlatformShell>
  );
}

export function GenerateSyntaxPage() {
  const campaignExport = getCmsExportPackage("campaign");

  return (
    <PlatformShell
      active="/create"
      eyebrow="Generate Code"
      title="產生 CMS 語法"
      description="Step 4：把選定方案轉成 CMS 可貼上的 HTML、CSS、JS 與追蹤資料。"
      showWorkflow
      activeWorkflowStep="generate-code"
    >
      <div className="builder-layout">
        <section className="module-card generate-checklist">
          <p className="eyebrow">Ready To CMS</p>
          <h2>輸出前檢查</h2>
          <div className="task-list">
            <article>
              <strong>方案</strong>
              <span>租屋免安裝情境版已選定為主推頁。</span>
            </article>
            <article>
              <strong>素材</strong>
              <span>需要 hero、三步驟方案、商品組合與贈獎模組。</span>
            </article>
            <article>
              <strong>追蹤</strong>
              <span>保留 hero CTA、商品點擊、贈獎點擊與會員券領取事件。</span>
            </article>
          </div>
          <div className="action-row">
            <Link href="/create/select">回到選定方案</Link>
            <Link href="/export">查看完整 CMS 匯出</Link>
          </div>
        </section>
        <CodeBlock title="Campaign HTML" value={campaignExport.html} />
      </div>
    </PlatformShell>
  );
}

export function RadarPage() {
  const featured = getFeaturedOpportunity();
  const ranked = getRankedOpportunities();

  return (
    <PlatformShell
      active="/radar"
      eyebrow="Demand Radar"
      title="機會雷達"
      description="查看需求訊號、議題排名與選中議題的洞察依據。"
    >
      <div className="radar-layout">
        <section className="module-card topic-list-panel">
          <p className="eyebrow">Ranked Topics</p>
          <h2>跨品類議題池</h2>
          <div className="topic-list">
            {ranked.map((opportunity) => (
              <DemandCard key={opportunity.id} opportunity={opportunity} selected={opportunity.id === featured.id} />
            ))}
          </div>
        </section>
        <section className="module-card topic-detail-panel">
          <div className="module-card-head">
            <div>
              <p className="eyebrow">Evidence inside radar</p>
              <h2>{featured.title}</h2>
            </div>
            <Score value={featured.businessScore} label="依據分數" />
          </div>
          <p className="lead">{featured.summary}</p>
          <SignalBars opportunity={featured} />
          <ReasoningList opportunity={featured} />
          <div className="action-row">
            <Link href="/strategy">用此議題產生策略</Link>
            <Link href="/builder">進入頁面產生器</Link>
          </div>
        </section>
      </div>
    </PlatformShell>
  );
}

export function ProjectsPage() {
  const featured = getFeaturedOpportunity();
  const variants = getComparisonVariants(featured.id);

  return (
    <PlatformShell
      active="/projects"
      eyebrow="My Campaign Projects"
      title="我的策展案"
      description="管理已選定議題、待辦、審核狀態與下一步產出。"
    >
      <div className="project-board">
        <section className="module-card project-summary">
          <div className="module-card-head">
            <div>
              <p className="eyebrow">Active Case</p>
              <h2>{featured.shortTitle}</h2>
            </div>
            <Score value={featured.businessScore} label="依據" />
          </div>
          <p className="lead">{featured.summary}</p>
          <div className="metric-strip">
            <Metric label="狀態" value="策略中" />
            <Metric label="產出" value="2 頁型" />
            <Metric label="測試" value="A/B" />
            <Metric label="CMS" value="待匯出" />
          </div>
          <div className="action-row">
            <Link href="/strategy">繼續策略</Link>
            <Link href="/builder">產生頁面</Link>
          </div>
        </section>

        <section className="module-card">
          <p className="eyebrow">Decision Queue</p>
          <h2>待確認項目</h2>
          <div className="task-list">
            <article>
              <strong>確認 B 版本是否作為主推</strong>
              <span>{variants[1].recommendation}</span>
            </article>
            <article>
              <strong>確認贈獎成本與門檻</strong>
              <span>{variants[1].rewardAngle}</span>
            </article>
            <article>
              <strong>確認 CMS 視覺素材需求</strong>
              <span>需要 hero、商品組合、贈獎卡與活動規則模組。</span>
            </article>
          </div>
        </section>
      </div>
    </PlatformShell>
  );
}

export function EvidencePage() {
  const featured = getFeaturedOpportunity();
  const average = getBusinessReasoningAverage(featured);

  return (
    <PlatformShell
      active="/evidence"
      eyebrow="Evidence Brief"
      title="需求洞察"
      description="查看選中議題的需求來源、商品適配與商業判斷。"
    >
      <div className="app-grid">
        <section className="module-card span-8">
          <div className="module-card-head">
            <h2>{featured.title}</h2>
            <Score value={average} label="綜合判斷" />
          </div>
          <p className="lead">{featured.summary}</p>
          <SignalBars opportunity={featured} />
        </section>
        <section className="module-card span-4">
          <p className="eyebrow">Decision Factors</p>
          <ReasoningList opportunity={featured} />
        </section>
      </div>
    </PlatformShell>
  );
}

export function StrategyPage() {
  const featured = getFeaturedOpportunity();
  const variants = getComparisonVariants(featured.id);

  return (
    <PlatformShell
      active="/strategy"
      eyebrow="Strategy Studio"
      title="方案與 AI 預估"
      description={`目前議題：${featured.shortTitle}。比較策展方案並決定頁面產出。`}
    >
      <div className="strategy-workspace">
        <section className="module-card strategy-context">
          <p className="eyebrow">Selected Demand</p>
          <h2>{featured.title}</h2>
          <p className="lead">{featured.summary}</p>
          <div className="metric-strip">
            <Metric label="需求熱度" value={featured.momentum} />
            <Metric label="商品適配" value={featured.productFit} />
            <Metric label="贈獎適配" value={featured.rewardFit} />
            <Metric label="CRM 價值" value={featured.crmFit} />
          </div>
        </section>

        <section className="strategy-board">
          {campaignStrategies.map((strategy) => (
          <article className="module-card" key={strategy.id}>
            <div className="module-card-head">
              <h2>{strategy.name}</h2>
              <Score value={strategy.confidence} label="信心" />
            </div>
            <p className="proposition">{strategy.proposition}</p>
            <dl className="compact-list">
              <div>
                <dt>商品邏輯</dt>
                <dd>{strategy.productLogic}</dd>
              </div>
              <div>
                <dt>贈獎邏輯</dt>
                <dd>{strategy.rewardLogic}</dd>
              </div>
              <div>
                <dt>成效假設</dt>
                <dd>{strategy.hypothesis}</dd>
              </div>
            </dl>
          </article>
          ))}
        </section>

        <section className="module-card comparison-panel">
          <p className="eyebrow">A/B Recommendation</p>
          <h2>比較兩種上線方式</h2>
          <div className="ab-grid">
            {variants.map((variant) => (
              <article key={variant.label}>
                <span className="variant-label">{variant.label}</span>
                <h3>{variant.name}</h3>
                <p>{variant.pageAngle}</p>
                <strong>{variant.recommendation}</strong>
              </article>
            ))}
          </div>
          <div className="action-row">
            <Link href="/campaign">用 B 產生活動頁</Link>
            <Link href="/rewards">同步產生贈獎頁</Link>
          </div>
        </section>
      </div>
    </PlatformShell>
  );
}

export function CampaignBuilderPage() {
  return (
    <PlatformShell
      active="/campaign"
      eyebrow="Campaign Builder"
      title="活動策展頁產生器"
      description="把選定方案轉成 CMS 可用的活動頁區塊。"
    >
      <BuilderPreview type="campaign" />
    </PlatformShell>
  );
}

export function RewardBuilderPage() {
  return (
    <PlatformShell
      active="/rewards"
      eyebrow="Reward Builder"
      title="贈獎集合頁產生器"
      description="用情境、門檻與會員需求重組贈獎入口。"
    >
      <BuilderPreview type="reward" />
    </PlatformShell>
  );
}

export function PageGeneratorPage() {
  return (
    <PlatformShell
      active="/builder"
      eyebrow="Page Generator"
      title="頁面產生器"
      description="產生活動策展頁與贈獎集合頁草稿。"
    >
      <div className="builder-hub">
        <section className="module-card">
          <p className="eyebrow">Campaign Page</p>
          <h2>活動策展頁</h2>
          <p className="lead">用需求情境、商品組合、贈獎理由與 CTA 組成完整策展頁。</p>
          <div className="action-row">
            <Link href="/campaign">打開活動頁草稿</Link>
          </div>
        </section>
        <section className="module-card">
          <p className="eyebrow">Reward Collection</p>
          <h2>贈獎集合頁</h2>
          <p className="lead">依生活情境、消費門檻與會員需求重組贈獎入口。</p>
          <div className="action-row">
            <Link href="/rewards">打開贈獎頁草稿</Link>
          </div>
        </section>
      </div>
    </PlatformShell>
  );
}

export function ExportPage() {
  const campaignExport = getCmsExportPackage("campaign");
  const rewardExport = getCmsExportPackage("reward");

  return (
    <PlatformShell
      active="/export"
      eyebrow="CMS Export"
      title="CMS 素材包"
      description="輸出 CMS 可用的 HTML、CSS、JS、JSON 與追蹤資料。"
    >
      <div className="export-grid app-export-grid">
        <CodeBlock title="Campaign HTML" value={campaignExport.html} />
        <CodeBlock title="Campaign CSS" value={campaignExport.css} />
        <CodeBlock title="Campaign JS" value={campaignExport.js} />
        <CodeBlock title="Reward JSON" value={JSON.stringify(rewardExport.json, null, 2)} />
      </div>
    </PlatformShell>
  );
}

export function FeedbackPage() {
  return (
    <PlatformShell
      active="/feedback"
      eyebrow="Learning Loop"
      title="成效回流"
      description="查看上線後假設驗證、頁面區塊表現與下一步建議。"
    >
      <div className="feedback-grid app-feedback-grid">
        {feedbackItems.map((item) => (
          <article className="module-card" key={item.label}>
            <span>{item.label}</span>
            <strong>{item.value}</strong>
            <p>{item.detail}</p>
          </article>
        ))}
      </div>
    </PlatformShell>
  );
}

function SavedProjectsTable({ projects }: { projects: SavedCampaignProject[] }) {
  return (
    <section className="module-card saved-projects-panel">
      <div className="module-card-head">
        <div>
          <p className="eyebrow">Saved Campaigns</p>
          <h2>目前儲存的策展案</h2>
          <p className="lead">工作台只顯示已存在的案子；要開新案，從左側「建立策展案」進入完整流程。</p>
        </div>
        <Score value={projects.length} label="案子" />
      </div>
      <div className="saved-project-list">
        {projects.map((project) => (
          <Link href={project.stage === "AI 預估比較" ? "/create/compare" : "/create/options"} key={project.id}>
            <div>
              <strong>{project.title}</strong>
              <span>{project.demand}</span>
            </div>
            <Metric label="階段" value={project.stage} />
            <Metric label="推薦分" value={project.score} />
            <div className="project-next">
              <small>{project.updatedAt} / {project.owner}</small>
              <b>{project.nextAction}</b>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}

function ForecastCharts() {
  const bars = [
    { label: "文案吸引度", a: 56, b: 88 },
    { label: "活動力度", a: 62, b: 84 },
    { label: "商品組合", a: 70, b: 86 },
    { label: "CRM 價值", a: 62, b: 86 }
  ];

  return (
    <section className="forecast-chart-row" aria-label="AI forecast charts">
      <article className="module-card forecast-chart-card">
        <p className="eyebrow">Effect Forecast</p>
        <h2>方案成效預估</h2>
        <div className="chart-bars">
          {bars.map((bar) => (
            <div className="chart-row" key={bar.label}>
              <strong>{bar.label}</strong>
              <div>
                <span style={{ width: `${bar.a}%` }}>A</span>
              </div>
              <div>
                <span className="best" style={{ width: `${bar.b}%` }}>B</span>
              </div>
            </div>
          ))}
        </div>
      </article>
      <article className="module-card forecast-chart-card">
        <p className="eyebrow">Decision Shape</p>
        <h2>AI 判斷雷達</h2>
        <div className="radar-chart" aria-label="B 方案雷達圖">
          <span>需求</span>
          <span>文案</span>
          <span>贈獎</span>
          <span>商品</span>
          <span>CRM</span>
        </div>
      </article>
    </section>
  );
}

function ProposalCard({ proposal }: { proposal: CampaignProposal }) {
  return (
    <article className="module-card proposal-card">
      <div className="module-card-head">
        <div>
          <span className="variant-label">{proposal.label}</span>
          <h2>{proposal.name}</h2>
          <p className="lead">{proposal.campaignClaim}</p>
        </div>
        <Score value={proposal.label === "B" ? 86 : 62} label="預估" />
      </div>

      <ProposalEditor proposal={proposal} />

      <div className="proposal-reasoning">
        <strong>AI 產生理由</strong>
        {proposal.reasoning.map((reason) => (
          <p key={reason}>{reason}</p>
        ))}
      </div>
    </article>
  );
}

function DemandCard({ opportunity, selected }: { opportunity: DemandOpportunity; selected: boolean }) {
  return (
    <article className={`module-card demand-app-card ${selected ? "selected" : ""}`}>
      <div className="module-card-head">
        <div>
          <p className="eyebrow">{opportunity.recommendedOutput}</p>
          <h2>{opportunity.shortTitle}</h2>
          <small>{opportunity.categoryGroup}</small>
        </div>
        <Score value={opportunity.momentum} label="熱度" />
      </div>
      <p className="lead">{opportunity.summary}</p>
      <div className="metric-strip">
        <Metric label="商品" value={opportunity.productFit} />
        <Metric label="贈獎" value={opportunity.rewardFit} />
        <Metric label="CRM" value={opportunity.crmFit} />
      </div>
      <div className="keyword-row">
        {opportunity.keywords.map((keyword) => (
          <span key={keyword}>{keyword}</span>
        ))}
      </div>
    </article>
  );
}

function Metric({ label, value }: { label: string; value: string | number }) {
  return (
    <span className="metric-chip">
      <small>{label}</small>
      <strong>{value}</strong>
    </span>
  );
}

function SignalBars({ opportunity }: { opportunity: DemandOpportunity }) {
  return (
    <div className="signal-bars">
      {opportunity.signals.map((signal) => (
        <div className="signal-row" key={signal.label}>
          <div>
            <strong>{signal.label}</strong>
            <span>{signal.note}</span>
          </div>
          <div className="bar-track" aria-label={`${signal.label} ${signal.value}%`}>
            <span style={{ width: `${signal.value}%` }} />
          </div>
        </div>
      ))}
    </div>
  );
}

function ReasoningList({ opportunity }: { opportunity: DemandOpportunity }) {
  return (
    <div className="reasoning-list">
      {opportunity.reasoning.map((item) => (
        <article key={item.label}>
          <span>{item.score}</span>
          <div>
            <h3>{item.label}</h3>
            <p>{item.detail}</p>
          </div>
        </article>
      ))}
    </div>
  );
}

function BuilderPreview({ type }: { type: "campaign" | "reward" }) {
  const sections = type === "campaign" ? campaignPageSections : rewardPageSections;
  const exportPackage = getCmsExportPackage(type);

  return (
    <div className="builder-layout">
      <section className="generated-page">
        <div className="generated-hero">
          <p>{sections[0].eyebrow}</p>
          <h2>{sections[0].title}</h2>
          <span>{sections[0].body}</span>
          <button>{sections[0].cta}</button>
        </div>
        <div className="generated-sections">
          {sections.slice(1).map((section) => (
            <article key={section.title}>
              <span>{section.eyebrow}</span>
              <h3>{section.title}</h3>
              <p>{section.body}</p>
            </article>
          ))}
        </div>
      </section>
      <aside className="module-card export-aside">
        <p className="eyebrow">Export Preview</p>
        <h2>{exportPackage.json.title}</h2>
        <CodeBlock title="HTML" value={exportPackage.html} />
      </aside>
    </div>
  );
}

function Score({ value, label }: { value: number; label: string }) {
  return (
    <div className="mini-score">
      <span>{value}</span>
      <small>{label}</small>
    </div>
  );
}

function CodeBlock({ title, value }: { title: string; value: string }) {
  return (
    <article className="code-card">
      <div>
        <strong>{title}</strong>
        <span>CMS ready</span>
      </div>
      <pre>{value}</pre>
    </article>
  );
}
