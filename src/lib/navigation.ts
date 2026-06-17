export type PlatformModule = {
  href: string;
  label: string;
  shortLabel: string;
  task: string;
  status: "Ready" | "Draft" | "Review";
};

export type CampaignWorkflowStep = {
  id: string;
  href: string;
  label: string;
  shortLabel: string;
  task: string;
};

export const platformModules: PlatformModule[] = [
  {
    href: "/",
    label: "Command Center",
    shortLabel: "總覽",
    task: "查看今日需求、策展任務與平台整體狀態",
    status: "Ready"
  },
  {
    href: "/radar",
    label: "Opportunity Radar",
    shortLabel: "機會雷達",
    task: "跨品類查看顧客需求、熱門議題與策展機會排名",
    status: "Ready"
  },
  {
    href: "/projects",
    label: "My Campaign Projects",
    shortLabel: "我的策展案",
    task: "管理已選定、進行中、待審核與準備上線的策展案",
    status: "Ready"
  },
  {
    href: "/builder",
    label: "Page Generator",
    shortLabel: "頁面產生器",
    task: "把已確認策略轉成活動頁與贈獎集合頁草稿",
    status: "Draft"
  },
  {
    href: "/export",
    label: "CMS Export",
    shortLabel: "CMS 匯出",
    task: "輸出 HTML、CSS、JS、JSON 與追蹤參數素材包",
    status: "Review"
  },
  {
    href: "/feedback",
    label: "Learning Loop",
    shortLabel: "成效回流",
    task: "把上線後的假設驗證回流到下一次策展",
    status: "Review"
  }
];

export const campaignWorkflowSteps: CampaignWorkflowStep[] = [
  {
    id: "insight",
    href: "/radar#insight",
    label: "Demand Insight",
    shortLabel: "洞察",
    task: "確認議題背後的需求來源、品類關聯與消費者情境"
  },
  {
    id: "strategy",
    href: "/strategy",
    label: "Strategy",
    shortLabel: "策略",
    task: "將議題延伸為可討論的活動主張與溝通角度"
  },
  {
    id: "comparison",
    href: "/strategy#ab-test",
    label: "A/B Comparison",
    shortLabel: "A/B",
    task: "比較原活動做法與顧客需求導向做法"
  },
  {
    id: "campaign",
    href: "/campaign",
    label: "Campaign Page",
    shortLabel: "活動頁",
    task: "產出活動策展頁草稿"
  },
  {
    id: "rewards",
    href: "/rewards",
    label: "Reward Page",
    shortLabel: "贈獎頁",
    task: "產出贈獎集合頁草稿"
  },
  {
    id: "export",
    href: "/export",
    label: "Export",
    shortLabel: "匯出",
    task: "整理 CMS 所需 HTML、CSS、JS、JSON 與追蹤參數"
  },
  {
    id: "feedback",
    href: "/feedback",
    label: "Feedback",
    shortLabel: "成效",
    task: "回收上線後成效並形成下一次策展依據"
  }
];
