"use client";

import { useState } from "react";
import type { CampaignProposal } from "../data/mockStudio";
import { getDemoActionLabels } from "../lib/studio";

export function ProposalEditor({ proposal }: { proposal: CampaignProposal }) {
  const [editingField, setEditingField] = useState<string | null>(null);
  const [values, setValues] = useState({
    productBundle: proposal.productBundle,
    copyDirection: proposal.copyDirection,
    rewardIntensity: proposal.rewardIntensity,
    channelPlan: proposal.channelPlan
  });
  const demoActionLabels = getDemoActionLabels(proposal);

  const fields = [
    { key: "campaignType", label: "頁型", value: proposal.campaignType, editable: false },
    { key: "targetAudience", label: "目標客群", value: proposal.targetAudience, editable: false },
    { key: "productBundle", label: "商品組合", value: values.productBundle, editable: true },
    { key: "copyDirection", label: "文案方向", value: values.copyDirection, editable: true },
    { key: "rewardIntensity", label: "贈獎力度", value: values.rewardIntensity, editable: true },
    { key: "channelPlan", label: "渠道", value: values.channelPlan, editable: true },
    { key: "expectedImpact", label: "預估成效", value: proposal.expectedImpact, editable: false },
    {
      key: "cost",
      label: "成本 / 難度",
      value: `毛利壓力 ${proposal.marginPressure}，執行難度 ${proposal.executionEffort}`,
      editable: false
    }
  ];

  function applyDemoValue(label: string) {
    const suffix = proposal.label === "B" ? "，加強租屋限制與電費焦慮情境" : "，維持檔期基準版語氣";

    setValues((current) => ({
      productBundle: `${current.productBundle}${suffix}`,
      copyDirection: `${current.copyDirection}${suffix}`,
      rewardIntensity: `${current.rewardIntensity}${suffix}`,
      channelPlan: `${current.channelPlan}${suffix}`
    }));
    setEditingField(label);
  }

  return (
    <>
      <div className="proposal-field-grid">
        {fields.map((field) => (
          <div className={field.editable ? "editable" : ""} key={field.key}>
            <header>
              <small>{field.label}</small>
              {field.editable ? (
                <button onClick={() => setEditingField(field.key)} type="button">
                  編輯
                </button>
              ) : null}
            </header>
            {field.editable && editingField === field.key ? (
              <textarea
                aria-label={field.label}
                onChange={(event) =>
                  setValues((current) => ({
                    ...current,
                    [field.key]: event.target.value
                  }))
                }
                value={field.value}
              />
            ) : (
              <p>{field.value}</p>
            )}
          </div>
        ))}
      </div>

      <div className="edit-chip-row" aria-label="Editable fields">
        {demoActionLabels.map((label) => (
          <button key={label} onClick={() => applyDemoValue(label)} type="button">
            {label}
          </button>
        ))}
      </div>
      <div className="demo-state">
        <strong>Demo 狀態</strong>
        <span>按「編輯」可直接改欄位內容；「套用假資料」會把示範用內容帶入欄位，方便呈報操作流程。</span>
      </div>
    </>
  );
}
