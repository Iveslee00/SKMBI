import {
  campaignPageSections,
  campaignStrategies,
  demandOpportunities,
  feedbackItems,
  rewardPageSections
} from "../data/mockStudio";
import {
  getBusinessReasoningAverage,
  getCmsExportPackage,
  getFeaturedOpportunity,
  getPrimaryStrategy
} from "../lib/studio";

export default function Home() {
  const featured = getFeaturedOpportunity();
  const strategy = getPrimaryStrategy();
  const campaignExport = getCmsExportPackage("campaign");
  const rewardExport = getCmsExportPackage("reward");
  const reasoningAverage = getBusinessReasoningAverage(featured);

  return (
    <main className="studio-shell" id="main-content">
      <header className="topbar">
        <div>
          <p className="eyebrow">Customer-Led Campaign Studio</p>
          <h1>讓每一個 EC 策展活動，都從顧客真實需求開始。</h1>
        </div>
        <div className="topbar-score" aria-label="featured opportunity score">
          <span>{featured.businessScore}</span>
          <small>策展依據分數</small>
        </div>
      </header>

      <section className="command-strip" aria-label="workflow">
        {["需求訊號", "策展依據", "策略生成", "頁面產出", "CMS 匯出", "成效回流"].map(
          (item, index) => (
            <div className="workflow-step" key={item}>
              <span>{String(index + 1).padStart(2, "0")}</span>
              {item}
            </div>
          )
        )}
      </section>

      <div className="studio-grid">
        <section className="panel demand-panel">
          <div className="section-heading">
            <p className="eyebrow">Customer Demand Radar</p>
            <h2>今日值得策展的顧客需求</h2>
          </div>
          <div className="demand-list">
            {demandOpportunities.map((opportunity) => (
              <article
                className={`demand-card ${opportunity.id === featured.id ? "is-active" : ""}`}
                key={opportunity.id}
              >
                <div>
                  <h3>{opportunity.shortTitle}</h3>
                  <p>{opportunity.summary}</p>
                </div>
                <div className="card-metrics">
                  <span>熱度 {opportunity.momentum}</span>
                  <span>{opportunity.recommendedOutput}</span>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="panel evidence-panel">
          <div className="section-heading">
            <p className="eyebrow">Curation Evidence</p>
            <h2>{featured.title}</h2>
          </div>
          <p className="lead">{featured.summary}</p>

          <div className="signal-bars">
            {featured.signals.map((signal) => (
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

          <div className="keyword-row">
            {featured.keywords.map((keyword) => (
              <span key={keyword}>{keyword}</span>
            ))}
          </div>
        </section>

        <section className="panel decision-panel">
          <div className="section-heading compact">
            <p className="eyebrow">Business Reasoning</p>
            <h2>不是因為檔期，而是因為需求成立</h2>
          </div>
          <div className="reasoning-score">
            <span>{reasoningAverage}</span>
            <p>綜合消費需求、商品適配、贈獎邏輯與商業優先度。</p>
          </div>
          <div className="reasoning-grid">
            {featured.reasoning.map((item) => (
              <article key={item.label}>
                <span>{item.score}</span>
                <h3>{item.label}</h3>
                <p>{item.detail}</p>
              </article>
            ))}
          </div>
          <div className="risk-box">
            <strong>需要留意</strong>
            <ul>
              {featured.risks.map((risk) => (
                <li key={risk}>{risk}</li>
              ))}
            </ul>
          </div>
        </section>

        <section className="panel strategy-panel">
          <div className="section-heading">
            <p className="eyebrow">Strategy Studio</p>
            <h2>AI 產生的策展方向</h2>
          </div>
          <div className="strategy-grid">
            {campaignStrategies.map((item) => (
              <article className={item.id === strategy.id ? "strategy-card selected" : "strategy-card"} key={item.id}>
                <div className="strategy-card-head">
                  <h3>{item.name}</h3>
                  <span>{item.confidence}%</span>
                </div>
                <p className="proposition">{item.proposition}</p>
                <dl>
                  <div>
                    <dt>商品邏輯</dt>
                    <dd>{item.productLogic}</dd>
                  </div>
                  <div>
                    <dt>贈獎邏輯</dt>
                    <dd>{item.rewardLogic}</dd>
                  </div>
                </dl>
                <p className="hypothesis">{item.hypothesis}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="panel preview-panel">
          <div className="section-heading">
            <p className="eyebrow">Campaign Page Generator</p>
            <h2>活動策展頁草稿</h2>
          </div>
          <div className="page-preview campaign-preview">
            <p>{campaignPageSections[0].eyebrow}</p>
            <h3>{campaignPageSections[0].title}</h3>
            <span>{campaignPageSections[0].body}</span>
            <button>{campaignPageSections[0].cta}</button>
          </div>
          <div className="section-stack">
            {campaignPageSections.slice(1).map((section) => (
              <article key={section.title}>
                <span>{section.eyebrow}</span>
                <h3>{section.title}</h3>
                <p>{section.body}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="panel preview-panel reward-panel">
          <div className="section-heading">
            <p className="eyebrow">Reward Collection Generator</p>
            <h2>贈獎集合頁草稿</h2>
          </div>
          <div className="reward-board">
            {rewardPageSections.map((section) => (
              <article key={section.title}>
                <span>{section.eyebrow}</span>
                <h3>{section.title}</h3>
                <p>{section.body}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="panel export-panel">
          <div className="section-heading">
            <p className="eyebrow">CMS Export Center</p>
            <h2>HTML / CSS / JS / JSON 匯出包</h2>
          </div>
          <div className="export-grid">
            <CodeBlock title="Campaign HTML" value={campaignExport.html} />
            <CodeBlock title="Reward JSON" value={JSON.stringify(rewardExport.json, null, 2)} />
          </div>
        </section>

        <section className="panel feedback-panel">
          <div className="section-heading">
            <p className="eyebrow">Performance Feedback Loop</p>
            <h2>讓下一次策展更接近顧客</h2>
          </div>
          <div className="feedback-grid">
            {feedbackItems.map((item) => (
              <article key={item.label}>
                <span>{item.label}</span>
                <strong>{item.value}</strong>
                <p>{item.detail}</p>
              </article>
            ))}
          </div>
        </section>
      </div>
    </main>
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
