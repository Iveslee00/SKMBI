"use client";

import Link from "next/link";
import { startTransition, useMemo, useState } from "react";
import type { RankedOpportunity } from "../lib/studio";

export function DemandSelectionWorkbench({
  ranked,
  categories,
  categoryCounts
}: {
  ranked: RankedOpportunity[];
  categories: string[];
  categoryCounts: number[];
}) {
  const [activeCategory, setActiveCategory] = useState("全部");
  const [selectedId, setSelectedId] = useState(ranked[0]?.id ?? "");
  const filtered = useMemo(
    () =>
      activeCategory === "全部"
        ? ranked
        : ranked.filter((opportunity) => opportunity.categoryGroup === activeCategory),
    [activeCategory, ranked]
  );
  const selected = filtered.find((opportunity) => opportunity.id === selectedId) ?? filtered[0] ?? ranked[0];

  function selectCategory(category: string) {
    startTransition(() => {
      setActiveCategory(category);
      const next = category === "全部" ? ranked[0] : ranked.find((opportunity) => opportunity.categoryGroup === category);
      if (next) {
        setSelectedId(next.id);
      }
    });
  }

  function selectOpportunity(opportunityId: string) {
    startTransition(() => setSelectedId(opportunityId));
  }

  return (
    <div className="create-step-layout">
      <aside className="module-card filter-rail">
        <p className="eyebrow">Category Filters</p>
        <h2>篩選需求</h2>
        <div className="filter-list">
          {categories.map((category, index) => (
            <button
              aria-pressed={activeCategory === category}
              className={activeCategory === category ? "active" : ""}
              key={category}
              onClick={() => selectCategory(category)}
              type="button"
            >
              <span>{category}</span>
              <small>{categoryCounts[index]}</small>
            </button>
          ))}
        </div>
        <div className="filter-summary">
          <strong>本週排序邏輯</strong>
          <span>需求熱度 + 商業適配 + 贈獎適配 + CRM 價值 - 執行難度</span>
        </div>
      </aside>

      <section className="module-card opportunity-rank-panel" id="select-demand">
        <div className="module-card-head">
          <div>
            <p className="eyebrow">Step 1</p>
            <h2>選一個有依據的需求</h2>
            <p className="lead">這一步不是在想活動，而是在確認「為什麼值得做」。點選不同需求後，右側會即時更新推薦分、數據與理由。</p>
          </div>
          <Score value={filtered.length} label="議題" />
        </div>
        <div className="demand-choice-list">
          {filtered.map((opportunity) => {
            const isSelected = opportunity.id === selected.id;

            return (
              <article className={isSelected ? "selected" : ""} key={opportunity.id}>
                <button
                  aria-pressed={isSelected}
                  className="choice-button"
                  onClick={() => selectOpportunity(opportunity.id)}
                  type="button"
                >
                  <div className="choice-main">
                    <span className="rank-number">{opportunity.rank}</span>
                    <div>
                      <strong>{opportunity.shortTitle}</strong>
                      <small>{opportunity.categoryGroup}</small>
                      <p>{opportunity.summary}</p>
                    </div>
                  </div>
                  <div className="choice-meta">
                    <Metric label="推薦分" value={opportunity.opportunityScore} />
                    <Metric label="熱度" value={opportunity.momentum} />
                    <Metric label="頁型" value={opportunity.recommendedOutput} />
                    <Metric label="難度" value={opportunity.executionEffort} />
                  </div>
                </button>
                <div className="action-row">
                  {isSelected ? (
                    <Link href="/create/options">選擇完畢，套用假資料</Link>
                  ) : (
                    <button onClick={() => selectOpportunity(opportunity.id)} type="button">
                      選擇此需求
                    </button>
                  )}
                </div>
              </article>
            );
          })}
        </div>
      </section>

      <section className="module-card selected-topic-panel" key={selected.id}>
        <div className="module-card-head">
          <div>
            <p className="eyebrow">Selected Preview</p>
            <h2>{selected.title}</h2>
          </div>
          <Score value={selected.opportunityScore} label="推薦分" />
        </div>
        <p className="lead">{selected.summary}</p>
        <div className="metric-strip">
          <Metric label="需求熱度" value={selected.momentum} />
          <Metric label="商品適配" value={selected.productFit} />
          <Metric label="贈獎適配" value={selected.rewardFit} />
          <Metric label="CRM 價值" value={selected.crmFit} />
        </div>
        <SignalBars opportunity={selected} />
        <ReasoningList opportunity={selected} />
        <div className="risk-box">
          <strong>需要留意</strong>
          <ul>
            {selected.risks.map((risk) => (
              <li key={risk}>{risk}</li>
            ))}
          </ul>
        </div>
      </section>
    </div>
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

function Score({ value, label }: { value: number; label: string }) {
  return (
    <div className="mini-score">
      <span>{value}</span>
      <small>{label}</small>
    </div>
  );
}

function SignalBars({ opportunity }: { opportunity: RankedOpportunity }) {
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

function ReasoningList({ opportunity }: { opportunity: RankedOpportunity }) {
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
