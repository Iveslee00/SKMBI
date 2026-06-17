import Link from "next/link";
import {
  campaignPageSections,
  campaignStrategies,
  demandOpportunities,
  feedbackItems,
  rewardPageSections,
  type DemandOpportunity
} from "../data/mockStudio";
import { platformModules } from "../lib/navigation";
import {
  getBusinessReasoningAverage,
  getCmsExportPackage,
  getComparisonVariants,
  getFeaturedOpportunity,
  getPrimaryStrategy,
  getRankedOpportunities
} from "../lib/studio";

export function PlatformShell({
  active,
  eyebrow,
  title,
  description,
  children
}: {
  active: string;
  eyebrow: string;
  title: string;
  description: string;
  children: React.ReactNode;
}) {
  return (
    <main className="app-shell" id="main-content">
      <aside className="sidebar" aria-label="Platform navigation">
        <div className="brand-block">
          <span>CL</span>
          <div>
            <strong>Campaign Studio</strong>
            <small>Customer-led EC</small>
          </div>
        </div>
        <nav className="module-nav">
          {platformModules.map((module) => (
            <Link
              aria-current={active === module.href ? "page" : undefined}
              className={active === module.href ? "active" : ""}
              href={module.href}
              key={module.href}
            >
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
        {children}
      </section>
    </main>
  );
}

export function DashboardPage() {
  const featured = getFeaturedOpportunity();
  const ranked = getRankedOpportunities();
  const selected = ranked[0];
  const variants = getComparisonVariants(selected.id);
  const categories = ["全部", ...Array.from(new Set(ranked.map((opportunity) => opportunity.categoryGroup)))];

  return (
    <PlatformShell
      active="/"
      eyebrow="Command Center"
      title="今天有哪些活動值得被策展？"
      description="行銷端先看跨品類機會排名，點進議題後再看依據、比較 A/B 策略，最後才進入活動頁或贈獎頁產出。"
    >
      <div className="command-layout">
        <aside className="module-card filter-rail">
          <p className="eyebrow">Category Filters</p>
          <h2>品類與工作類型</h2>
          <div className="filter-list">
            {categories.map((category, index) => (
              <button className={index === 0 ? "active" : ""} key={category}>
                {category}
              </button>
            ))}
          </div>
          <div className="filter-summary">
            <strong>本週排序邏輯</strong>
            <span>需求熱度 + 商業適配 + 贈獎適配 + CRM 價值 - 執行難度</span>
          </div>
        </aside>

        <section className="module-card opportunity-rank-panel">
          <div className="module-card-head">
            <div>
              <p className="eyebrow">Opportunity Ranking</p>
              <h2>策展機會排行榜</h2>
            </div>
            <Score value={ranked.length} label="議題" />
          </div>
          <div className="ranking-table">
            {ranked.map((opportunity) => (
              <article className={opportunity.id === selected.id ? "selected" : ""} key={opportunity.id}>
                <span className="rank-number">{opportunity.rank}</span>
                <div>
                  <strong>{opportunity.shortTitle}</strong>
                  <small>{opportunity.categoryGroup}</small>
                </div>
                <span>{opportunity.opportunityScore}</span>
                <span>{opportunity.recommendedOutput}</span>
                <span>{opportunity.executionEffort}</span>
              </article>
            ))}
          </div>
        </section>

        <section className="module-card selected-topic-panel">
          <div className="module-card-head">
            <div>
              <p className="eyebrow">Selected Topic</p>
              <h2>{selected.title}</h2>
            </div>
            <Score value={selected.opportunityScore} label="機會分" />
          </div>
          <p className="lead">{selected.summary}</p>
          <div className="metric-strip">
            <Metric label="需求成長" value={`+${selected.demandGrowth}%`} />
            <Metric label="商品適配" value={selected.productFit} />
            <Metric label="贈獎適配" value={selected.rewardFit} />
            <Metric label="CRM 價值" value={selected.crmFit} />
          </div>
          <SignalBars opportunity={selected} />
          <div className="action-row">
            <Link href="/radar">進入雷達詳情</Link>
            <Link href="/strategy">進策略工作室</Link>
          </div>
        </section>

        <section className="module-card comparison-panel">
          <div className="module-card-head">
            <div>
              <p className="eyebrow">A/B Test Planning</p>
              <h2>先比較，再產頁</h2>
            </div>
            <span className="mode-pill">Comparison Mode</span>
          </div>
          <div className="ab-grid">
            {variants.map((variant) => (
              <article key={variant.label}>
                <span className="variant-label">{variant.label}</span>
                <h3>{variant.name}</h3>
                <p>{variant.pageAngle}</p>
                <dl>
                  <div>
                    <dt>贈獎</dt>
                    <dd>{variant.rewardAngle}</dd>
                  </div>
                  <div>
                    <dt>預估 CTR / CVR</dt>
                    <dd>
                      +{variant.projectedCtrLift}% / +{variant.projectedCvrLift}%
                    </dd>
                  </div>
                  <div>
                    <dt>CRM 價值</dt>
                    <dd>{variant.crmValue}</dd>
                  </div>
                </dl>
                <strong>{variant.recommendation}</strong>
              </article>
            ))}
          </div>
        </section>
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
      title="從顧客需求開始，而不是從檔期開始"
      description="用假資料模擬站內搜尋、外部討論、商品互動與客服問題，把訊號整理成可策展機會。"
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
            <Link href="/campaign">產生活動頁</Link>
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
      title="這個活動為什麼應該存在？"
      description="把消費需求、商品適配、贈獎設計與商業判斷拆開來看，避免只靠直覺產生活動。"
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
      title="從選中議題延伸策略，而不是憑空生成"
      description={`目前議題：${featured.shortTitle}。先比較 A/B 策略，再決定要產生活動頁、贈獎集合頁或兩者都做。`}
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
      description="把策略轉成一組可被設計、審核與放進 CMS 的頁面區塊。"
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
      description="不是列出所有贈品，而是用生活情境、門檻與會員需求重組贈獎入口。"
    >
      <BuilderPreview type="reward" />
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
      description="把頁面草稿拆成 CMS 可接受的 HTML、CSS、JS 與 JSON，後續再接內部匯入格式。"
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
      title="讓每一次上線都回到下一次策展"
      description="用假資料呈現活動上線後如何驗證需求假設、頁面區塊與贈獎影響。"
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
