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
  getFeaturedOpportunity,
  getPrimaryStrategy
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
  const strategy = getPrimaryStrategy();

  return (
    <PlatformShell
      active="/"
      eyebrow="Command Center"
      title="今天有哪些活動值得被策展？"
      description="把需求訊號、活動依據、頁面產出與成效回流放在同一個工作台，讓團隊先判斷為什麼做，再決定怎麼做。"
    >
      <div className="app-grid">
        <section className="module-card span-7">
          <div className="module-card-head">
            <div>
              <p className="eyebrow">Priority Opportunity</p>
              <h2>{featured.title}</h2>
            </div>
            <Score value={featured.businessScore} label="依據分數" />
          </div>
          <p className="lead">{featured.summary}</p>
          <div className="action-row">
            <Link href="/evidence">查看策展依據</Link>
            <Link href="/campaign">產生活動頁</Link>
          </div>
        </section>

        <section className="module-card span-5">
          <p className="eyebrow">Selected Strategy</p>
          <h2>{strategy.name}</h2>
          <p className="lead">{strategy.proposition}</p>
          <dl className="compact-list">
            <div>
              <dt>商品邏輯</dt>
              <dd>{strategy.productLogic}</dd>
            </div>
            <div>
              <dt>贈獎邏輯</dt>
              <dd>{strategy.rewardLogic}</dd>
            </div>
          </dl>
        </section>

        <section className="module-card span-12">
          <p className="eyebrow">Workflow Modules</p>
          <div className="module-table">
            {platformModules.slice(1).map((module) => (
              <Link href={module.href} key={module.href}>
                <strong>{module.shortLabel}</strong>
                <span>{module.task}</span>
                <small>{module.status}</small>
              </Link>
            ))}
          </div>
        </section>
      </div>
    </PlatformShell>
  );
}

export function RadarPage() {
  const featured = getFeaturedOpportunity();

  return (
    <PlatformShell
      active="/radar"
      eyebrow="Demand Radar"
      title="從顧客需求開始，而不是從檔期開始"
      description="用假資料模擬站內搜尋、外部討論、商品互動與客服問題，把訊號整理成可策展機會。"
    >
      <div className="app-grid">
        {demandOpportunities.map((opportunity) => (
          <DemandCard key={opportunity.id} opportunity={opportunity} selected={opportunity.id === featured.id} />
        ))}
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
  return (
    <PlatformShell
      active="/strategy"
      eyebrow="Strategy Studio"
      title="把需求轉成可以討論的策略版本"
      description="同一個顧客需求可以有不同活動主張，平台需要幫團隊比較商品、贈獎與溝通角度。"
    >
      <div className="strategy-board">
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
        </div>
        <Score value={opportunity.momentum} label="熱度" />
      </div>
      <p className="lead">{opportunity.summary}</p>
      <div className="keyword-row">
        {opportunity.keywords.map((keyword) => (
          <span key={keyword}>{keyword}</span>
        ))}
      </div>
    </article>
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
